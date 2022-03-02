import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { request } from '../src/utils/axios-utils';
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const fetchSuperHeroes = () => {
  return request({ url: '/superheroes' });
};
//Flags
//Fresh
//Fetching
//inactive
//Stale
export const useSuperHerosData = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);
  //do SideEffects when a Query is Success/Error
  const onSuccess = (data) => {
    console.log('sucess after data fetching', data);
    if (data.length === 6) {
      setRefetchInterval(false);
    }
    const randomNumber = randomIntFromInterval(15, 100);
    /*     axios.post('http://localhost:4000/superheroes', {
      id: randomNumber,
      name: `Hector Lopez ${randomNumber}`,
      alterEgo: `El Pibe ${randomNumber}`,
    }); */
  };
  const onError = (error) => {
    console.log('Error after data fetching', error);
    setRefetchInterval(false);
  };
  return useQuery(`super-heroes`, fetchSuperHeroes, {
    /*     select: (data) => {
      // Data Transformation, Filtering, any ETL on the Client
      const superHerosNames = data.data.map((hero) => hero.name);
      return superHerosNames;
    }, */
    onSuccess: onSuccess,
    onError: onError,
    enabled: true,
    refetchInterval: false, //pooling of query
    refetchIntervalInBackground: false, // do pooling on background
    refetchOnWindowFocus: true, //refetch when windows in focus
    refetchOnMount: true, //refetch is the query is stale on mount
    cacheTime: 5000,
    staleTime: 0, // no aditional background request in this timestamp
  });
};

const addSuperHero = (hero) => {
  return request({ url: '/superheroes', method: 'post', data: hero });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    retry: 3,
    onMutate: async (newHero) => {
      //cancel any queries going on
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes'); //update cache on what is gonna be expected from SERVER
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newHero, id: oldQueryData?.data?.length + 1 },
          ],
        };
      });

      return {
        previousHeroData, //RollBack if Error is Encounter
      };
    },
    onError: (_error, _hero, context) => {
      //RollBack if neccesarry
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled: () => {
      //FINALLY
      queryClient.invalidateQueries('super-heroes'); //INVALIDATE QUERY SO
      //CACHE can be in sync WITH SERVER STATE
    },
    /*     onSuccess: (data) => {
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
      });
      // queryClient.invalidateQueries('super-heroes');
    }, */
  });
};
//optimitic updated...updated cache before doing a MUTATION
// Under the ASUMPTION nothing goes Wrong(DB IS NOT UPDATED)
