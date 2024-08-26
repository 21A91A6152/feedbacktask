 
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import SignIn from './components/login';
import FeedbackForm from './components/Form';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/" element={<Blog/>}/>
          <Route path="/login" element={<SignIn/>}/>
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
