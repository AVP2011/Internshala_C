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

  const fetchPosts = async () => {
    const res = await axios.get<Post[]>("https://internshala-c.onrender.com/api/posts"); // Tell TypeScript this is Post[]
    setPosts(res.data);
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
      {posts.map((post) => (
        <PostCard key={post._id} post={post} likePost={likePost} commentPost={commentPost} />
      ))}
    </div>
  );
};

export default PublicSpace;
