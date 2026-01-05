import React, { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import PostCard from "../components/PostCard";
import NoData from "../components/NoData";

const Home = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axiosInstance.get("/posts/all");
            const data = res.data.posts;
            setPosts(data || []);
         } catch (error) {
            console.log("Failed to Fetch all posts : ", error.message);
         }
      };

      fetchPosts();
   }, []);

   return (
      <div className="px-12 pt-4 pb-6">
         {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {posts.map((post) => (
                  <PostCard post={post} />
               ))}
            </div>
         ) : (
            <NoData content={"no posts available !"} />
         )}
      </div>
   );
};

export default Home;
