import React, { useState } from "react";

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

interface PostCardProps {
  post: Post;
  likePost: (postId: string) => void;
  commentPost: (postId: string, text: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, likePost, commentPost }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentPost(post._id, commentText.trim());
    setCommentText("");
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>{post.userId.name}</strong>
        <span style={styles.date}>{new Date(post.createdAt).toLocaleString()}</span>
      </div>

      <p>{post.caption}</p>

      {post.mediaUrl && (
        <img src={post.mediaUrl} alt="post media" style={styles.media} />
      )}

      <div style={styles.actions}>
        <button onClick={() => likePost(post._id)} style={styles.likeBtn}>
          👍 {post.likes.length}
        </button>
      </div>

      <div style={styles.comments}>
        {post.comments.map((c) => (
          <div key={c._id} style={styles.comment}>
            <strong>{c.userId.name}:</strong> {c.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={styles.commentInput}
        />
        <button type="submit" style={styles.commentButton}>Comment</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginBottom: 16 },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  date: { fontSize: "0.8rem", color: "#555" },
  media: { maxWidth: "100%", borderRadius: 5, marginTop: 8, marginBottom: 8 },
  actions: { marginBottom: 8 },
  likeBtn: { padding: "0.5rem 1rem", cursor: "pointer", borderRadius: 5, border: "none", backgroundColor: "#007bff", color: "#fff" },
  comments: { marginBottom: 8 },
  comment: { padding: "4px 0", fontSize: "0.9rem" },
  commentForm: { display: "flex", gap: 8 },
  commentInput: { flex: 1, padding: "0.5rem", borderRadius: 5, border: "1px solid #ccc" },
  commentButton: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" },
};

export default PostCard;
