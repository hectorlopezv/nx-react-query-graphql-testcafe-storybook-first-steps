//1 Query depents on another one

import axios from 'axios';
import { useQuery } from 'react-query';

//you need to wait for one finish to start it.
const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCourserByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueriesPage = ({ email }) => {
  //fetch list of courses DEPENDING ON EMAIL
  //FETCH CHANNEL DETAILS DEPENDENING ON RESPONSE
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  //STEP2

  const { data: channels } = useQuery(
    ['courses', channelId],
    () => fetchCourserByChannelId(channelId),
    { enabled: !!channelId }
  );

  return <div>DependentQueriesPage</div>;
};
