import React from 'react'
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginHook} from '@/hooks/userhook';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// const setUser = useUserStore((state) => state.setUser);
import { Spinner } from '@/components/ui/spinner';
const Login=()=>{
     const navigate = useNavigate();
  const location = useLocation();
    const {register,handleSubmit}=useForm();
    const {mutate,isPending }=useLoginHook()
    console.log(location)
     const from = location.state?.from || "/";
     console.log(from)
    const registerFormHandler = (data) => {
  mutate(data, {
      onSuccess: () => {
        //  setUser(res.user);
        console.log(from)
        navigate(from, { replace: true }); // 🔥 same page pe wapas
      },
    });
};
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-6">
      Register
    </h2>

    <form onSubmit={(handleSubmit(registerFormHandler))}className="space-y-4">
     

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
       {isPending?<Spinner/>:"Logged In"} 
      </button>
      <h1>Don't have Account ? Register here <Link to ='/register'>Register</Link></h1>
    </form>
     <div> <Link to='/'>Skip</Link></div>
  </div>
</div>

)
}
export default Login;