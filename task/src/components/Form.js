import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = { name, email, message };
    
    try {
      const response = await fetch('https://feedbacktask.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        alert('Feedback sent successfully');
      } else {
        alert('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Send Feedback</button>
    </form>
  );
};

export default FeedbackForm;
