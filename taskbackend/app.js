const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

 

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email transport using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manojmaridi666@gmail.com',
        pass: 'twws ipfi pavo frie'
      },
  });

  const mailOptions = {
      from: 'manojmaridi666@gmail.com',
      to: email,
    subject: `Feedback from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send feedback' });
    }
    res.status(200).json({ message: 'Feedback sent successfully' });
  });
});


// Schema for blog post

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  // API to get all posts
  app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  });
  
  // API to create a new post
  app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  });
  
  // API to edit a post
  app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedPost);
  });
  
  // API to delete a post
  app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  });

 


// /telegram integration


app.post('/api/send-telegram', async (req, res) => {
  const { message } = req.body;  // Destructure the message from the request body
  const telegramToken = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log({ message });  // For debugging purposes

  try {
    const response = await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      chat_id: chatId,
      text: message,  // Send the plain text message
    });
    res.status(200).json(response.data);
    console.log(response.data);  // For debugging purposes
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message to Telegram' });
    console.log('Failed to send message to Telegram');
  }
});

  


  
 
 

  mongoose.set('strictQuery', true);

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });