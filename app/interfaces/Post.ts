export interface Post {
  id: string;
  creater: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  tag: string;
  prompt: string;
}
