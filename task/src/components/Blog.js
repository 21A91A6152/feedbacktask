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
  <div
    key={post._id}
    className="bg-white shadow-lg rounded-lg p-6 mb-8 transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
  >
    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
    <p className="text-gray-600 text-sm mb-4">
      {new Date(post.date).toLocaleDateString()}
    </p>
    <p className="text-gray-800 mb-4">{post.content}</p>
    <p className="text-gray-600 mb-4">Author: {post.user}</p>
    <div className="flex justify-between items-center">
      <button className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-300">
        <i className="fa-solid fa-heart"></i> Like
      </button>
    </div>
  </div>
))}

    </div>
  );
};

export default Blog;
