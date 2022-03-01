import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
const fetchSuperHero = ({ queryKey }) => {
  return axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);
};
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient(); //getting access to the query cash
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      // to not Show the loading state and JUST show initialData, (OPTIMITIC UPdates)
      const hero = queryClient //get from the query
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined; 
      }
    },
  });
};
