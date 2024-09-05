import React from 'react';
import imglogo from '../images/logotw.png'
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src={imglogo} alt='' style={{width:"300px"}}></img>
            <p className="text-sm mt-2">© {new Date().getFullYear()} QuickBlog. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">About</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.52 1.56-1.34 1.88-2.33-.83.49-1.75.85-2.72 1.04a4.91 4.91 0 0 0-8.37 4.48A13.94 13.94 0 0 1 1.64 4.15 4.89 4.89 0 0 0 3.17 9.7c-.73-.02-1.42-.22-2.02-.56v.06c0 2.28 1.63 4.18 3.79 4.62-.4.11-.82.17-1.26.17-.31 0-.61-.03-.91-.09.61 1.91 2.38 3.3 4.47 3.34A9.86 9.86 0 0 1 1 19.58c-.33 0-.66-.02-.98-.06a13.92 13.92 0 0 0 7.54 2.21c9.05 0 14-7.5 14-14V8.5c.96-.7 1.8-1.56 2.46-2.5z" />
              </svg>
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.04c-5.49 0-9.95 4.45-9.95 9.96 0 4.41 2.86 8.14 6.82 9.47.5.09.68-.21.68-.47 0-.23-.01-.84-.01-1.65-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.84.09-.65.35-1.1.63-1.36-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.02-2.69-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.74 1.02.8-.22 1.66-.33 2.52-.33s1.71.11 2.51.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.63.7 1.02 1.6 1.02 2.69 0 3.86-2.34 4.69-4.57 4.94.36.31.67.93.67 1.88 0 1.36-.01 2.46-.01 2.79 0 .26.18.57.69.47 3.96-1.33 6.81-5.06 6.81-9.47 0-5.51-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.04c-5.49 0-9.95 4.45-9.95 9.96 0 4.41 2.86 8.14 6.82 9.47.5.09.68-.21.68-.47 0-.23-.01-.84-.01-1.65-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.84.09-.65.35-1.1.63-1.36-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.02-2.69-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.74 1.02.8-.22 1.66-.33 2.52-.33s1.71.11 2.51.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.63.7 1.02 1.6 1.02 2.69 0 3.86-2.34 4.69-4.57 4.94.36.31.67.93.67 1.88 0 1.36-.01 2.46-.01 2.79 0 .26.18.57.69.47 3.96-1.33 6.81-5.06 6.81-9.47 0-5.51-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
