import React from "react";

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
  return (
    <div className="post-card">
      <h4>{post.userId.name}</h4>
      <p>{post.caption}</p>
      {post.mediaUrl && <img src={post.mediaUrl} alt="post media" />}
      <div>
        <button onClick={() => likePost(post._id)}>Like ({post.likes.length})</button>
        <button>Comment ({post.comments.length})</button>
      </div>
      <div>
        {post.comments.map((c) => (
          <p key={c._id}>{c.text}</p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
