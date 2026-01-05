import React, { useState, useContext } from "react";
import axiosInstance from "../api/Api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
   const [isRegister, setIsRegister] = useState(false);
   const [name, setName] = useState("");
   const [bio, setBio] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const { logIn } = useContext(AuthContext);

   const navigate = useNavigate();

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         await axiosInstance.post("/auth/register", { name, bio, email, password });
         setIsRegister(false);
         setEmail("")
         setPassword("")
         toast.success("User Registered Successfully.");
      } catch (error) {
         toast.error(error.response.data.message);
         console.log("cannot register this user : ", error.message);
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const res = await axiosInstance.post("/auth/login", { email, password });
         const { token, user } = res.data;
         logIn(token, user );
         navigate("/");
      } catch (error) {
         toast.error(error.response.data.message);
         console.log("error on login : ", error.message);
      }
   };

   return (
      <section className="flex items-center justify-center h-[80vh] w-full">
         <div className="px-12 py-10 max-w-lg border-2 rounded-lg flex-1 mt-6">
            <h2 className="text-2xl mb-6 text-center font-semibold">{isRegister ? "Register" : "Login"}</h2>
            <form
               onSubmit={isRegister ? handleRegister : handleLogin}
               className="flex flex-col gap-2 text-white text-md"
            >
               {isRegister && (
                  <>
                     <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#7f3f4e] border-2 border-black/40 outline-none rounded-lg w-full p-2.5 placeholder:text-white"
                        placeholder="Enter Your Name"
                        required
                     />
                     <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-[#7f3f4e] border-2 border-black/40 outline-none rounded-lg w-full p-2.5 placeholder:text-white"
                        rows={4}
                        placeholder="Enter Bio"
                     />
                  </>
               )}
               <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#7f3f4e] border-2 border-black/40 outline-none rounded-lg w-full p-2.5 placeholder:text-white"
                  placeholder="Enter Email"
                  type="email"
                  required
               />
               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#7f3f4e] border-2 border-black/40 outline-none rounded-lg w-full p-2.5 placeholder:text-white"
                  placeholder="Password"
                  type="password"
                  required
               />
               <button
                  type="submit"
                  className="bg-green-500 text-white p-3 text-sm font-semibold rounded-lg mt-2 cursor-pointer"
               >
                  {isRegister ? "Register" : "Login"}
               </button>
            </form>
            <div className="mt-2 text-end">
               <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-sm font-semibold text-gray-600 cursor-pointer hover:underline hover:text-blue-500 "
               >
                  {isRegister ? "Already Have an account ?" : "Create New Account ?"}
               </button>
            </div>
         </div>
      </section>
   );
};

export default Login;
