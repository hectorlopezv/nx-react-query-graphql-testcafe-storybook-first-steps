import { useQuery } from 'react-query';
import { useState } from 'react';
import axios from 'axios';
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
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
    axios.post('http://localhost:4000/superheroes', {
      id: randomNumber,
      name: `Hector Lopez ${randomNumber}`,
      alterEgo: `El Pibe ${randomNumber}`,
    });
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
