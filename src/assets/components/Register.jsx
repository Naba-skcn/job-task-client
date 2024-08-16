import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { getAuth, updateProfile } from 'firebase/auth'; 
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';


const Register = () => {
    const { createUser, logout } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout()
        .then()
        .catch()
    }

    const handleRegister = async (e) => { 
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        
        // Password verification rules
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasLength = password.length >= 6;

        if (!(hasUppercase && hasSpecialChar && hasLength)) {
            setError('Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.');
            return;
        }
         
        try {
            // Create user in Firebase
            const result = await createUser(email, password);
            // Update user profile 
        await updateProfile(getAuth().currentUser, { displayName: name, photoURL: photoURL });

            // data in MongoDB
            const newUser = {
                name,
                email,
                photoURL,
            };
            const response = await fetch('https://real-estate-server-a12.vercel.app/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            console.log(name, photoURL)

            if (response.ok) {
                swal("Registration successful!");
                handleSignOut();
                formRef.current.reset(); 
                 navigate('/login');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .hero {
                    font-family: 'PT Serif', serif;
                }

                .form-control label {
                    color: #d2ad5f;
                }

                .form-control input {
                    font-family: 'PT Serif', serif;
                }

                .btn {
                    font-family: 'PT Serif', serif;
                }

                `}
            </style>
        
            <div className="hero min-h-screen bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1445114193960-1a2d5b35213b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D')]">
            <Helmet><title>CarSphere | Sign-up</title></Helmet>
                <div className="hero-content flex-col  mt-[100px] ">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white">Sign-up now!</h1>
                    </div>
                    <p className='text-white text-center font-semibold'>Join CarSphere today! <br /> Sign up now to unlock exclusive deals, browse the latest cars, and start your car journey with us. 🚗</p>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#a00000]">
                        <form onSubmit={handleRegister} ref={formRef} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Name</span>
                                </label>
                                <input type="text" placeholder="Your name" name='name' className="text-white input input-bordered" required />
                                <label className="label">
                                    <span className="text-white label-text font-semibold">Email</span>
                                </label>
                                <input type="email" placeholder="Email" name='email' className="input input-bordered text-white" required />
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Photo URL</span>
                                </label>
                                <input type="url" placeholder="Your photo URL" name='photoURL' className="input input-bordered text-white" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold text-white">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name='password' className="input input-bordered" required />
                                <span className='absolute text-white top-[50px] right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-black border-black text-white">Sign up</button>
                                {error && <p className="text-white-500 mt-2">{error}</p>}
                            </div>
                        </form>
                        <p className='text-center text-white'>Already have an account? Please<Link to="/login"><button className='btn btn-link text-white'>Sign in</button></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
