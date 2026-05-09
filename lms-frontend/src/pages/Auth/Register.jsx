import React from 'react'
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRegisterHook } from '@/hooks/userhook';
import { Spinner } from '@/components/ui/spinner';
const Register=()=>{
 const navigate=useNavigate();
    const {register,handleSubmit}=useForm();
    const {mutate,isPending }=useRegisterHook()
    const registerFormHandler=(data)=>{
        mutate(data);
        console.log("Mutate",data)
        navigate('/')
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-6">
      Register
    </h2>

    <form onSubmit={(handleSubmit(registerFormHandler))}className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        {...register("fullName")}
        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full h-11 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
       {isPending?<Spinner/>:"Register"} 
      </button>
      <h1>Already have an acccount ?<Link to ='/login'>Login</Link></h1>
    </form>
    <div> <Link to='/'>Skip</Link></div>
  </div>
</div>

)
}
export default Register;