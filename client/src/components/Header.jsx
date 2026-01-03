import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
   const { user } = useContext(AuthContext);

   return (
      <header className="flex justify-between items-center sticky top-0 left-0 h-14 w-full px-12 bg-[#7f3f4e] text-white">
         <Link to={"/"} className="text-xl font-semibold">
            Bloggy
         </Link>
         <div className="flex items-center gap-5">
            <Link to={"/myposts"} className="text-sm mr-4">
               My Posts
            </Link>
            {!user ? (
               <Link to={"/login"} className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-md">
                  Login
               </Link>
            ) : (
               <>
                  <Link to={"/create"} className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                     Create Post
                  </Link>
                  <Link to={"/profile"}>
                     <RxAvatar className="h-7 w-7 bg-gray-300 rounded-full" />
                  </Link>
               </>
            )}
         </div>
      </header>
   );
};

export default Header;
