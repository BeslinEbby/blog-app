import React, { useState, useEffect } from "react";
import axiosInstance from "../api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";


export default function CreatePost() {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [file, setFile] = useState();
   const [saving, setSaving] = useState(false);

   const navigate = useNavigate();
   const location = useLocation();

   const submitPost = async (e) => {
      e.preventDefault();
      try {
         setSaving(true);
         const fd = new FormData();
         fd.append("title", title);
         fd.append("content", content);
         if (file) fd.append("coverImage", file);

         if (location.state) {
            await axiosInstance.put(`/posts/update/${location.state?._id}`, fd, {
               headers: { "Content-Type": "multipart/form-data" },
            });
         } else {
            await axiosInstance.post("/posts/create", fd, {
               headers: { "Content-Type": "multipart/form-data" },
            });
         }
         toast.success(`Post ${location.state ? "Updated" : "Created"} Successfully`)
         navigate(-1);
      } catch (err) {
         toast.error(err.response.data.message || `Post ${location.state ? "Updation" : "Creation"} Failed`);
         console.log("Error on post create/update :", err.message);
      }finally{
         setSaving(false);
      }
   };

   useEffect(() => {
      if (location.state) {
         setTitle(location.state.title);
         setContent(location.state.content);
      }
   }, [location.state]);

   return (
      <section className=" w-full h-[80vh] flex items-center justify-center ">
         <div className=" max-w-xl sm:border-2 border-black/40 rounded-lg px-12 py-8 flex-1">
            <h2 className="text-xl mb-4 text-center font-semibold">Create Post</h2>
            <form onSubmit={submitPost} className="flex flex-col gap-2">
               <input
                  className="border outline-none rounded-lg px-4 py-2 text-sm"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />
               <textarea
                  className="border outline-none rounded-lg px-4 py-2 text-sm"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
               />
               <div className="w-full h-36 flex justify-center items-center gap-8 my-2">
                  <div className="basis-[10%] h-12 border rounded-lg overflow-hidden relative" title="upload">
                     <input
                        className=" border-none outline-none w-full h-full opacity-0  cursor-pointer"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                     />
                     <FaCloudUploadAlt className="absolute top-0 left-0 -z-10 bg-gray-300 p-3 w-full h-full" />
                  </div>
                  <div className="basis-[30%] h-full border rounded-lg flex items-center justify-center">
                     {file || location.state ?
                     (
                        <img className="w-full h-full rounded-lg object-fill" src={location.state?.coverimage?.url ? location.state.coverImage.url : URL.createObjectURL(file)} alt="" />
                     )
                     :
                     <span className="px-4 text-center capitalize">no image selected</span>
                     }
                  </div>
               </div>
               <button className="bg-green-500 text-white text-sm font-semibold px-3 py-2 cursor-pointer rounded">
                  {saving ? "Saving..." : location.state ? "Update" : "Publish"}
               </button>
            </form>
         </div>
      </section>
   );
}
