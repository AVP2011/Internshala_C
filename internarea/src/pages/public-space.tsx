import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../Components/PostCard";
import { useSelector } from "react-redux";
import { selectUser } from "../Feature/userSlice";

interface Comment {
  _id?: string;
  userId: { _id: string; name: string };
  text: string;
  createdAt: string;
}

interface Post {
  _id: string;
  userId: { _id: string; name: string };
  caption: string;
  mediaUrl?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

const PublicSpace: React.FC = () => {
  const currentUser = useSelector(selectUser);
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>(
        "https://internshala-c.onrender.com/api/posts"
      );
      setPosts(res.data);
    } catch (err: any) {
      console.error("❌ Error fetching posts:", err.message);
    }
  };

const handleCreatePost = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  console.log("🧠 currentUser from Redux:", currentUser);
  console.log("📝 Attempting to create post with:", {
    firebaseId: currentUser?.firebaseId,
    name: currentUser?.name,
    email: currentUser?.email,
    photo: currentUser?.photo,
    caption,
    mediaUrl,
  });

  if (!currentUser?.firebaseId || !currentUser?.name || !currentUser?.email) {
    console.warn("⚠️ Missing user info. Aborting post creation.");
    setError("User info missing. Please login again.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      "https://internshala-c.onrender.com/api/posts/create",
      {
        firebaseId: currentUser.firebaseId,
        caption,
        mediaUrl,
        name: currentUser.name,
        email: currentUser.email,
        photo: currentUser.photo || "",
      }
    );
    console.log("✅ Post created successfully:", res.data);
    setCaption("");
    setMediaUrl("");
    fetchPosts();
  } catch (err: any) {
    console.error("❌ Error creating post:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

const likePost = async (postId: string) => {
  console.log("👍 Liking post:", postId, "by user:", currentUser?.firebaseId);
  try {
    await axios.post("https://internshala-c.onrender.com/api/posts/like", {
      postId,
      userId: currentUser.firebaseId,
    });
    fetchPosts();
  } catch (err) {
    console.error("❌ Error liking post:", err);
  }
};

const commentPost = async (postId: string, text: string) => {
  console.log("💬 Commenting on post:", postId, "by user:", currentUser?.firebaseId, "text:", text);
  try {
    await axios.post("https://internshala-c.onrender.com/api/posts/comment", {
      postId,
      userId: currentUser.firebaseId,
      text,
    });
    fetchPosts();
  } catch (err) {
    console.error("❌ Error commenting:", err);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌐 Public Space</h2>

      <form onSubmit={handleCreatePost} style={styles.form}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Posting..." : "Create Post"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      <div style={styles.feed}>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share something!</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              likePost={likePost}
              commentPost={commentPost}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: "700px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" },
  heading: { textAlign: "center", marginBottom: "2rem" },
  form: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" },
  input: { padding: "0.75rem", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "0.75rem", fontSize: "1rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", fontWeight: "bold" },
  feed: { display: "flex", flexDirection: "column", gap: "1.5rem" },
};

export default PublicSpace;
