import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../Components/PostCard";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>("https://internshala-c.onrender.com/api/posts");
      setPosts(res.data);
    } catch (err: any) {
      console.error("❌ Error fetching posts:", err.message);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://internshala-c.onrender.com/api/posts/create", {
        userId: "CURRENT_USER_ID", // Replace with actual user ID
        caption,
        mediaUrl,
      });
      console.log("✅ Post created:", res.data);
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
    await axios.post("https://internshala-c.onrender.com/api/posts/like", { postId, userId: "CURRENT_USER_ID" });
    fetchPosts();
  };

  const commentPost = async (postId: string, text: string) => {
    await axios.post("https://internshala-c.onrender.com/api/posts/comment", { postId, userId: "CURRENT_USER_ID", text });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Public Space</h2>

      {/* ✅ Create Post Form */}
      <form onSubmit={handleCreatePost} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Create Post"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* ✅ Post Feed */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} likePost={likePost} commentPost={commentPost} />
      ))}
    </div>
  );
};

export default PublicSpace;
