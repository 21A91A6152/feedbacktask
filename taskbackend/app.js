const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const  BlogsLogindata  = require('./models/Logindata');
require('dotenv').config();
 

 

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
 
mongoose.set('strictQuery', true);
var uri= "mongodb+srv://manoj:manojmaridi66@cluster0.j10nr.mongodb.net/blogger?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri, { useUnifiedTopology: true, tlsAllowInvalidCertificates: true, loggerLevel: 'debug' }, function(err, client) {
    if (err) {
        console.error('Connection failed:', err);
    } else {
        console.log('Connected successfully');
         
    }
});

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
    user:String,
    date: { type: Date, default: Date.now },
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  // API to get all posts
  app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  });
  
  // API to get all admin posts
  app.get('/api/adminposts', async (req, res) => {
    try {
      const userId = req.query.userId; // Get user ID from query parameters
      console.log(userId)
      const posts = await Post.find({ user: userId }); // Fetch posts for the specific user
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // API to create a new post
  app.post('/api/posts', async (req, res) => {
    const { title, content,user } = req.body;
    const newPost = new Post({ title, content,user });
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

  
  //signup process

  app.post('/adddetailssignup',async(req,res,next)=>{
    console.log(req.body.formData)
    const {email,password,fname,lname, phone}=req.body.formData;
    let users
    try{
      users = await BlogsLogindata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    var name=fname+" "+lname;
    const emailbody=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
      /* Add your styles here */
      body {
        font-family: 'Arial', sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
      }
      .header {
        background-color: #4CAF50;
        color: #fff;
        padding: 15px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 10px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="cid:logo" style="width: 250px;">
      </div>
      <div class="content">
         <p>Dear  ${name},</p>
         <p>We’re excited to see you back on Quick Bloger!</p>
         <p>🎉 Thank you for logging into your account. We hope you’re enjoying the latest updates and content on our site. If you have any questions or need assistance, feel free to reach out to our support team.🎉</p>
         <p>Here’s a quick overview of what you can do while you’re here:</p>
         <ul>
            <li><span style="font-weight: bold;"> Explore New Posts:</span> Check out our latest articles and updates.</li>
            <li><span style="font-weight: bold;"> Manage Your Account: </span> Update your profile, check your activity, and customize your preferences.</li>
            <li><span style="font-weight: bold;">Engage with Content:</span>Leave comments, share posts, and interact with other readers.</li>
         </ul>
        <p>If you encountered any issues while logging in or if there’s anything we can do to improve your experience, please let us know in feedbackform.</p>
        <p>Thank you for being a valued member of our community!</p>

        <p>Best regards,</p>
        <p>The Quick Bloger Team</p>
        
      </div>

      <div class="footer">
        <p>© 2024 manojkumar. All rights reserved.</p>
      </div>
    </div>
  </body>
</html> `
    if(!users){
        const stud =new BlogsLogindata({
            fname,
            lname,
            email,
            password,  
            phone,
          })
          stud.save();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'manojmaridi666@gmail.com',
          pass: 'twws ipfi pavo frie'
        }
      });
      
      var mailOptions = {
        from: 'manojmaridi666@gmail.com',
        to: email,
        subject: 'Welcome Back to QuickBloger!',
        html: emailbody,
        attachments: [
          {
            filename: 'logotw.png',
            path: './models/logotw.png',
            cid: 'logo'
          },
        ],};
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.send({msg:"Account registered successfully"}) 
    }
    else{
      return res.status(200).json({msg:"email exists!.."})
    }
  });


  //login process
  app.post('/logindetailsA',async (req,res,next)=>{
  
     
    const { email, password } = req.body.formdataL;
    let users;
    try{
      users = await BlogsLogindata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"Not registered"})
    }
    else{
      if(users.password===password){
        return res.status(200).json({msg:"login successful",email:users})
      }
      else{
        return res.status(200).json({msg:"password incorrect"})
      }
    }
     
  })


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

  


  
 
 

  


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });