import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdImageNotSupported } from "react-icons/md";

const PostCard = ({ post }) => {
   const { user } = useContext(AuthContext);   

   return (
      <Link to={`/post/${post._id}`} key={post._id} className="text-black/90">
         <div className="border-2 border-black/60  px-4 py-2 rounded-lg flex flex-col justify-between gap-2">
            <p className="text-sm line-clamp-1">{post.content}</p>
            <h3 className="text-lg font-semibold capitalize">{post.title}</h3>
            {post.coverImage.url ? (
               <img src={post.coverImage.url} alt="" className="h-40 w-full object-fill my-1 rounded-lg" />
            ) : (
               <div className="w-full h-40  bg-gray-300 rounded-lg flex items-center justify-center mb-2">
                  <MdImageNotSupported className=" w-full h-1/2 p-1" />
               </div>
            )}
            <span className="font-semibold">By {post.author?._id === user._id ? "You" : post.author?.name}</span>
         </div>
      </Link>
   );
};

export default PostCard;
