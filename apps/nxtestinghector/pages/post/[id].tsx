import type { NextPage } from 'next';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { endpoint } from '../../utils/cosntants';
const Post: NextPage<{ id: number }> = ({ id }) => {
  const router = useRouter();
  const { data } = useQuery(`posts${id}`, async () => {
    const { post } = await request(
      endpoint,
      gql`
       query {
          post(id: ${router.query.id || id}) {
            id
            title
            body
          }
        }
     `
    );
    return post;
  });
  return (
    <div className="flex-col flex">
      <p className="text-red-800">{`Post Information Using React Query && Graphql`}</p>
      <div>titulo</div>
      <p className="">{data?.title}</p>
      <p className="">{data?.body}</p>
    </div>
  );
};

export default Post;

export async function getStaticProps(context: any) {
  const { id } = context.params;
  return {
    props: {
      id: id,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }], //prerender this
    fallback: 'blocking', //wait for staticprops to finish
  };
}
