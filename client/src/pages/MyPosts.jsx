import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import axiosInstance from "../api/Api";
import NoData from "../components/NoData";

const MyPosts = () => {
   const [userPosts, setUserPosts] = useState([]);

   useEffect(() => {
      const fetchUserPosts = async () => {
         try {
            const res = await axiosInstance.get("/posts/user");
            const data = res.data.posts;
            setUserPosts(data || []);
         } catch (error) {
            console.log("Failed to Fetch user posts : ", error.message);
         }
      };

      fetchUserPosts();
   }, []);
   return (
      <div className="px-12 pt-4 pb-6">
         {userPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {userPosts.map((post) => (
                  <PostCard post={post} />
               ))}
            </div>
         ) : (
            <NoData content={"you don't created any posts yet !"} />
         )}
      </div>
   );
};

export default MyPosts;
