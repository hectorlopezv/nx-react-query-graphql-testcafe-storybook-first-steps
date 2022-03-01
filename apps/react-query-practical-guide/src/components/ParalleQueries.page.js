//Do Fetching of friend and SuperHeroes at the same time
import { useQuery } from 'react-query';
import axios from 'axios';
const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};
const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

export const ParallelQueriesPage = () => {
  //Call Multiple Times useQuery to do Parallel Queries
  const { data: superheroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);
  return (
    <div>
      {superheroes?.data?.map((hero) => (
        <div>{hero.name}</div>
      ))}

      {friends?.data?.map((hero) => (
        <div>{hero.name}</div>
      ))}
    </div>
  );
};
