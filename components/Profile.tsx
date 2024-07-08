import React from "react";
import Image from "next/image";
import PrompCard from "./PrompCard";
import { Post } from "@/app/interfaces/Post";

interface Props {
  name: string;
  desc: string;
  data: Post[];
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

const Profile: React.FC<Props> = ({ name, desc, data , handleEdit, handleDelete}) => {
  return (
  
    <section className='w-full'>
    <h1 className='head_text text-left'>
      <span className='blue_gradient'>{name} Profile</span>
    </h1>
    <p className='desc text-left'>{desc}</p>

    <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PrompCard
          key={post.id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  </section>
  );
};

export default Profile;
