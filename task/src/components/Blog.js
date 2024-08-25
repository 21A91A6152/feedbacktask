import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://feedbacktask.onrender.com/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.map((post) => (
        <div key={post._id} className="mb-8">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
