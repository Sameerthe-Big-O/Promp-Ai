"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Prompts from "../components/Prompts";
import { Suspense } from "react";
import { Circles } from "react-loader-spinner";
import { Post } from "@/app/interfaces/Post";

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data: Post[] = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creater.name) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //*debounce method 
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );

  };

  const handleTagClick = (tagName: string) => {
    
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <Suspense
        fallback={
          <Circles
            height="80"
            width="80"
            color="orange"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        }
      >
        {searchText ? (
          <Prompts data={searchedResults} handleTagClick={handleTagClick} />
        ) : Array.isArray(allPosts) && allPosts.length > 0 ? (
          <Prompts data={allPosts} handleTagClick={handleTagClick} />
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
      </Suspense>
    </section>
  );
};

export default Feed;
