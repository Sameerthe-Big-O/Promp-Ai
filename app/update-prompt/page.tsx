"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import toast from "react-hot-toast";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const {data} = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Setting isSubmitting to true");
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      console.log("Starting fetch request");
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      console.log("Fetch request completed");
      setTimeout(()=> {
        if (response.ok) {
          router.push("/");
        }
      },1000)
      toast.success("Prompt created successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};


function Searchbar() {
  return (
    // You could have a loading skeleton as the `fallback` too

    <Suspense fallback={ <h1>loading</h1>}>
      <UpdatePrompt />
    </Suspense>
  )
}

export default Searchbar;