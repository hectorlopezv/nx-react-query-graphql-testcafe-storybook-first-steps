import { request, gql } from 'graphql-request';
import { endpoint } from '../utils/cosntants';
import { useQuery } from 'react-query';
import { IPost } from '@testinghectornx/ui';

const usePosts = () => {
  return useQuery<IPost[], any>('posts', async () => {
    const { posts: { data = null } = null } = await request(
      endpoint,
      gql`
        query {
          posts {
            data {
              id
              title
            }
          }
        }
      `
    );
    return data;
  });
};
export default usePosts;
