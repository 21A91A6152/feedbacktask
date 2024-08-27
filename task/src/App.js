 
import './App.css';
import { useState } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import SignIn from './components/login';
import FeedbackForm from './components/Form';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <BrowserRouter>
      <Navbar setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/admin" element={<AdminPanel searchQuery={searchQuery}/>} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/" element={<Blog searchQuery={searchQuery}/>}/>
          <Route path="/login" element={<SignIn/>}/>
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
