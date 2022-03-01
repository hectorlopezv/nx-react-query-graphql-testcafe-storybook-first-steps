import { FC } from 'react';
import {Post, IPost} from '@hectorui/post';

interface IPosts {
  posts: IPost[];
}
export const Posts: FC<IPosts> = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts?.map((post) => {
          return (
            <Post title={post.title} id={post.id} key={`post_${post.id}`} />
          );
        })}
    </div>
  );
};

export default Posts;
