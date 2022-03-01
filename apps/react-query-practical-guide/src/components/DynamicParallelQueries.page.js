import { useQueries } from 'react-query';
import axios from 'axios';
const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const DynamicParallelQueriesPage = ({ heroIds }) => {
  const [hero1, hero2] = useQueries(
    //un array de {querykey, queryFn}
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ hero1, hero2 });
  return <div>DynamicParallelPage</div>;
};
