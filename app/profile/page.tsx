"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "@/components/Profile";
import { Post } from "../interfaces/Post";
import { Circles } from "react-loader-spinner";
const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<Post[]>();

  useEffect(() => {
    //*adding the default type system
    const fetchPosts = async <ResultType = Record<string, any>>() => {
      if (session && session.user) {
        const response = await fetch(`/api/users/${session.user?.id}/posts`);

        const { data } = await response.json();
        setMyPosts(data);
        return data;
      }
    };

    if (session?.user.id) fetchPosts<Post[]>();
  }, [session?.user.id]);



  const handleEdit=(post : Post)=> {
    console.log('post',post)
     router.push(`/update-prompt?id=${post.id}`)
  }
  const handleDelete = async (post:Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post.id}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts?.filter((item) => item.id !== post.id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {myPosts ? (
        <UserProfile
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          name="My"
          desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
          data={myPosts}
        />
      ) : (
        <Circles
          height="60"
          width="60"
          color="orange"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  );
};

export default Profile;
