import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../../Context/AuthContext/UseAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const onSubmit = (data) => {
        console.log(data);
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                // store the image and get the photo url 
                const formData = new FormData()
                formData.append('image', profileImg)
                const imageAPIURL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`
                axios.post(imageAPIURL, formData)
                    .then(res => {
                        console.log('image upload', res.data.data.url);
                        //create use in database 
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(userInfo)


                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                            })

                        const userProfile = {

                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        //update user profile 
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('profile updated');
                            })
                            .catch(err => {
                                console.log(err.message);
                            })

                    })

                navigate(location?.state || '/');






            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                    {
                        errors.name && <span className="text-red-600">Name is required</span>
                    }
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Photo" />
                    {
                        errors.photo && <span className="text-red-600">Photo is required</span>
                    }
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email && <span className="text-red-600">Email is required</span>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password && <span className="text-red-600">Password is required and must be at least 6 characters</span>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;