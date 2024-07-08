
"use client";
import PromptCard from "./PrompCard";
import { Post } from "@/app/interfaces/Post";
  
  interface PromptCardListProps {
    data: Post[];
    handleTagClick: (tagName: string) => void;
  }
  
  const PromptCardList: React.FC<PromptCardListProps> = ({
    data,
    handleTagClick,
  }) => {
  
    console.log('data here',data);  
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => {
        return  <PromptCard key={post.id} handleTagClick={handleTagClick} post={post} />
  })}
      </div>
    );
  };

  export default PromptCardList;