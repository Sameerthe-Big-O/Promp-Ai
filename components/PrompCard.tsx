'use client';

import { FC, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Post } from "@/app/interfaces/Post";

interface PrompCardProps {
  post: Post;
  handleTagClick?: (tagName: string) => void
  handleEdit?:() => void
  handleDelete?:()=> void
}

const PrompCard: FC<PrompCardProps> = ({ post, handleTagClick , handleEdit, handleDelete}) => {

  const [copied, setCopied] = useState<string | Boolean>("");
  const { data: session } = useSession();
  //*it reads the current path
  const pathName = usePathname();
  //*works as use Navigation in react router dom
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
 
    setTimeout(() => setCopied(false), 3000);
    toast.success("Copied to clipboard!");
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creater?.image as string} 
            alt="user_image"
            width={50}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h3 className='font-satoshi font-semibold text-gray-900'>{post?.creater?.name}</h3>
          <p
          className='font-inter text-sm text-gray-500'
          >{post?.creater.email}</p>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {
        session?.user?.id && 
      session?.user.id === post.creater.id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
     
  )

};

export default PrompCard;
