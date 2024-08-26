import React, { useEffect, useState ,useCallback} from 'react';

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
    }
  }, []);

  const fetchPosts = useCallback(() => {
    if (user) {
      fetch(`http://localhost:5000/api/adminposts?userId=${user}`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content, user };

    if (editId) {
      await fetch(`http://localhost:5000/api/posts/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      setEditId(null);
    } else {
      await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      await sendTelegramNotification(`New post added: ${title}`);
    }

    setTitle('');
    setContent('');
    fetchPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
    });
    fetchPosts();
  };

  const sendTelegramNotification = async (message) => {
    await fetch('http://localhost:5000/api/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {editId ? 'Update Post' : 'Add Post'}
        </button>
      </form>
      {posts.map((post) => (
        <div key={post._id} className="mb-8">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
          <p className="mt-2">{post.content}</p>
          <button
            onClick={() => handleEdit(post)}
            className="mr-4 bg-yellow-500 text-white py-1 px-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(post._id)}
            className="bg-red-500 text-white py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
