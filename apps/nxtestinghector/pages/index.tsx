import type { NextPage } from 'next';
import { Posts } from '@hectorui/posts';
import usePosts from '../graphql/useposts';

const Home: NextPage = () => {
  const { data = null } = usePosts();
  return (
    <>
      <h1 className="text-blue-700">{`Posts Fetching Using React Query && Graphql`}</h1>
      {data && <Posts posts={data} />}
    </>
  );
};

export default Home;
