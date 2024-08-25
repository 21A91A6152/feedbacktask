import { useState   } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn(){
    const [formdataA,setFormDataA]=useState({
        'email':'',
        'password':'',
    }) 

    
 
    const [display1, setDisplay1] = useState(true);
    const [display2, setDisplay2] = useState(false);
    const [display3, setDisplay3] = useState(false);
    const forgot=()=>{
        setDisplay3(true);
        setDisplay1(false);
        setDisplay2(false);
    }
    const signup=()=>{
        setDisplay2(true);
        setDisplay1(false);
        setDisplay3(false);
    }
 
    
     
     
    const handleSubmitA = async (e) => {
        e.preventDefault();
        console.log(formdataA);
    
        try {
            const response = await axios.post('http://localhost:5000/logindetailsA', { formdataA });
            const responseData = response.data;
    
            if (responseData.msg === "login successful") {
                await Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "login successful ...!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                localStorage.setItem('userData', JSON.stringify(responseData.email));
                window.location.href = '/admin';
            } else {
                Swal.fire({
                    title: "Login unsuccessful!",
                    text: "Check details and login!",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging in. Please try again later.",
                icon: "error"
            });
        }
    };
    

     
  
     
    
     
     
    return(
         
        <div className="container mx-auto px-4 py-6">
  {display1 && (
    <div className="flex justify-center items-center mt-8">
      <div className="w-full max-w-lg">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-yellow-400 text-3xl font-bold mb-6">Login to Customer Account</h1>
          
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              id="email"
              placeholder="Email Address"
              name="email"
              onChange={(e) => setFormDataA({ ...formdataA, email: e.target.value })}
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              className="w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
              name="password"
              onChange={(e) => setFormDataA({ ...formdataA, password: e.target.value })}
            />
          </div>

          <div className="text-center">
            <button
              onClick={forgot}
              className="text-yellow-400 hover:underline"
            >
              Forgotten password
            </button>
            <br /><br />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="button"
              onClick={handleSubmitA}
            >
              Login
            </button>
            <br /><br />
            <p className="text-white">
              If not registered, go to 
              <button
                onClick={signup}
                className="text-yellow-400 hover:underline ml-1"
              >
                signup page
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )}
  
  {display2 && (
    <div className="text-center text-white">Signup</div>
  )}
  
  {display3 && (
    <div className="text-center text-white">Forgot Password</div>
  )}
</div>

         
    );
}

export default SignIn;

 