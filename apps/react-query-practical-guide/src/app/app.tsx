import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import { RQSuperHeroPage } from '../components/RQSuperHero.page';
import { RQSuperHeroes } from '../components/RQSuperHeroes.page';
import { SuperHeroesPage } from '../components/SuperHeroes.page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ParallelQueriesPage } from '../components/ParalleQueries.page';
import { DynamicParallelQueriesPage } from '../components/DynamicParallelQueries.page';
import { DependentQueriesPage } from '../components/DependentQueries.page';
const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel Fetching</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">
                  RQ Dynamic Parallel Fetching
                </Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">RQ Dependent Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroe/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
            <Route path="/" element={<RQSuperHeroes />} />
            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
            <Route
              path="/rq-dependent-queries"
              element={<DependentQueriesPage email="hectorvmlopez@gmail.com" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueriesPage heroIds={[1, 3]} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
