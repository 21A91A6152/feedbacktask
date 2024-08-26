import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn() {
    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
        'fname': '',
        'lname': '',
        'phone': '',
    });
    const [formdataL,setFormdataL]=useState({
        'email':'',
        'password':'',
    }) 
    const [currentView, setCurrentView] = useState('login');

     

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/logindetailsA', { formdataL });
            const { msg, email } = response.data;

            if (msg === "login successful") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Login successful ...!",
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem('userData', JSON.stringify(email.email));
                window.location.href = '/';
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

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:5000/adddetailssignup', {formData})
            .then((res) => {
                Swal.fire({
                    title: "Success",
                    text: res.data.msg,
                    icon: "success"
                });
                setCurrentView('login')
            })
            .catch((error) => {
                console.error("Error occurred during signup:", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while signing up. Please try again later.",
                    icon: "error"
                });
            });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {currentView === 'login' && (
                <div className="flex justify-center items-center mt-8">
                    <div className="w-full max-w-lg">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                            <h1 className="text-yellow-400 text-3xl font-bold mb-6">Login to Customer Account</h1>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={(e)=>setFormdataL({...formdataL,email:e.target.value})}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e)=>setFormdataL({...formdataL,password:e.target.value})}
                                />
                            </div>
                            <div className="text-center">
                                <button onClick={() => setCurrentView('forgot')} className="text-yellow-400 hover:underline">
                                    Forgotten password
                                </button>
                                <br /><br />
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    type="button"
                                    onClick={handleLoginSubmit}
                                >
                                    Login
                                </button>
                                <br /><br />
                                <p className="text-white">
                                    If not registered, go to
                                    <button onClick={() => setCurrentView('signup')} className="text-yellow-400 hover:underline ml-1">
                                        signup page
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'signup' && (
                <div className="md:col-span-6 p-5">
                    <h1 className="text-warning text-2xl">Create your Account</h1>
                    <div className="row mt-1">
                        <div className="md:col-span-6 sm:col-span-12 p-4">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="w-full p-2 rounded"
                                    name="fname"
                                    placeholder="First name"
                                    onChange={(e)=>setFormData({...formData,fname:e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-6 sm:col-span-12 p-4">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="w-full p-2 rounded"
                                    name="lname"
                                    placeholder="Last name"
                                    onChange={(e)=>setFormData({...formData,lname:e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-span-12 p-4">
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    className="w-full p-2 rounded"
                                    id="email"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-span-12 p-4">
                            <div className="flex items-center">
                                <input
                                    id="number"
                                    className="w-full p-2 rounded"
                                    placeholder="Phone Number"
                                    name="phone"
                                    type="text"
                                    onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="md:col-span-6 sm:col-span-12 p-4">
                            <div className="flex items-center">
                                <input
                                    type="password"
                                    className="w-full p-2 rounded"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                />
                            </div>
                        </div>
                         
                        
                    </div>

                    <div className="row mt-1 text-center">
                        <div className="col-span-12">
                            <button
                                className="btn btn-primary w-full"
                                type="button"
                                onClick={handleSignupSubmit}
                            >
                                Create your account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'forgot' && (
                <div className="text-center text-white">Forgot Password</div>
            )}
        </div>
    );
}

export default SignIn;
