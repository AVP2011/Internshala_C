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
    if (commentText.trim()) {
      commentPost(post._id, commentText.trim());
      setCommentText("");
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>{post.userId.name}</strong>
        <span style={styles.timestamp}>{formatDate(post.createdAt)}</span>
      </div>

      <p style={styles.caption}>{post.caption}</p>

      {post.mediaUrl && (
        <img src={post.mediaUrl} alt="post media" style={styles.image} />
      )}

      <div style={styles.actions}>
        <button onClick={() => likePost(post._id)} style={styles.button}>
          👍 Like ({post.likes.length})
        </button>
      </div>

      <div style={styles.commentsSection}>
        <h5>💬 Comments ({post.comments.length})</h5>
        {post.comments.map((c) => (
          <div key={c._id} style={styles.comment}>
            <strong>{c.userId.name}:</strong> {c.text}
            <div style={styles.commentTime}>{formatDate(c.createdAt)}</div>
          </div>
        ))}

        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={styles.commentInput}
          />
          <button type="submit" style={styles.commentButton}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#666",
  },
  caption: {
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  actions: {
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  commentsSection: {
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
  },
  comment: {
    marginBottom: "0.5rem",
  },
  commentTime: {
    fontSize: "0.75rem",
    color: "#888",
    marginLeft: "0.5rem",
  },
  commentForm: {
    display: "flex",
    marginTop: "1rem",
    gap: "0.5rem",
  },
  commentInput: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  commentButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PostCard;
