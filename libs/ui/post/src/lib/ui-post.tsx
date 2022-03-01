import { FC } from "react";
import Link from "next/link";
export interface IPost {
  title: string;
  id: string;
}

export const Post: FC<IPost> = ({ title, id }) => {
  return (
    <div className="flex">
      <Link href={`/post/${id}`}>
        <a className="text-red-900 ml-4 mr-11">{id}</a>
      </Link>
      <p>{title}</p>
    </div>
  );
};

export default Post;
