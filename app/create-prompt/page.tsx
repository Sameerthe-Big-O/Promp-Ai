"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Form from "../../components/Form";

const CreatePrompt = () => {
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (session?.user) {
        console.log(post.prompt, session?.user?.id, post.tag);
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user?.id,
            tag: post.tag,
          }),
        });

        setTimeout(() => {
          if (response.ok) {
            console.log("ass");
            router.push("/");
          }
        }, 1000);
      }
      toast.success("Prompt created successfully!");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
