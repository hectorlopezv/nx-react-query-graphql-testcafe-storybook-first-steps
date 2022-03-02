import {
  useAddSuperHeroData,
  useSuperHerosData,
} from '../../hooks/useSuPerHeroesData';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RQSuperHeroes = () => {
  const [name, setname] = useState('');
  const [alterEgo, setalterEgo] = useState('');

  const {
    mutate,
    isLoading: addHeroLoading,
    isError: addHeroError,
    error: addHeroerrormessage,
    isSuccess,
    mutateAsync,
    reset, //RESET error and data from mutation,

  } = useAddSuperHeroData();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useSuperHerosData();

  console.log('isLoading, isFetching', isLoading, isFetching);

  const handleAddHero = () => {
    console.log('Add Hero');
    const hero = { name, alterEgo };
    mutate(hero);
  };
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ SuperHeroesPage</h2>
      <div>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        <input
          type="text"
          onChange={(e) => setalterEgo(e.target.value)}
          value={alterEgo}
        />
        <button onClick={handleAddHero}>Add New Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.data?.map((hero) => (
        <div key={`hero.name${hero.id}`}>
          <Link to={`/super-heroe/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
