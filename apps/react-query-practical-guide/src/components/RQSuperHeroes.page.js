import { useSuperHerosData } from '../../hooks/useSuPerHeroesData';
import { Link } from 'react-router-dom';
export const RQSuperHeroes = () => {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useSuperHerosData();

  console.log('isLoading, isFetching', isLoading, isFetching);
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>RQ SuperHeroesPage</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.data?.map((hero) => (
        <div key={`hero.name${hero.id}`}>
          <Link to={`/super-heroe/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
