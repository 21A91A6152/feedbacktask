 
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Blog from './components/Blog';
import FeedbackForm from './components/Form';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/blog" element={<Blog/>}/>
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
