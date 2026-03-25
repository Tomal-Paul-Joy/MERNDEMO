import React from 'react';
import { useForm } from "react-hook-form"
import UseAuth from '../../../Context/AuthContext/UseAuth';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router';

const Login = () => {
    const { signInUser, signInWithGmail, setUser } = UseAuth();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                setUser(res.user);

                navigate(location?.state || '/');

            })
            .catch(err => {
                console.log(err.message);
            })

    }
    const handleGmail = () => {
        signInWithGmail()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    email: res.user.email,
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL,
                }
                navigate(location?.state || '/');
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    ,
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })


                setUser(res.user);
            })
            .catch(err => {
                console.log(err.message);
            })
    }




    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)} >

                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <span className="text-red-600">Email is required</span>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>

            </form>
            <p>Don't have account <b><NavLink state={location?.pathname} to='/register'>Register</NavLink></b> </p>
            {/* Google */}
            <button onClick={handleGmail} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

        </div>
    );
};

export default Login;