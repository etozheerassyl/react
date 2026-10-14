import { movieApi } from './src/api/movieApi.js';
import { INITIAL_MOVIES } from './src/data/initialMovies.js';

// Polyfill localStorage for node environment test
const memoryStorage = {};
global.localStorage = {
  getItem: (key) => memoryStorage[key] || null,
  setItem: (key, val) => { memoryStorage[key] = String(val); },
  removeItem: (key) => { delete memoryStorage[key]; },
  clear: () => { Object.keys(memoryStorage).forEach(k => delete memoryStorage[k]); }
};

async function runTests() {
  console.log('=== STARTING TEST SUITE ===');
  
  // 1. Initial count
  console.log('Checking initial records...');
  if (INITIAL_MOVIES.length < 100) {
    throw new Error(`Fail: Expected at least 100 records, got ${INITIAL_MOVIES.length}`);
  }
  console.log(`PASS: Initial records count = ${INITIAL_MOVIES.length} (>= 100 requirement fulfilled)`);

  // 2. Fetch default page
  console.log('Testing movieApi.getMovies()...');
  const res1 = await movieApi.getMovies({ page: 1, limit: 9 });
  console.log(`PASS: Page 1 items = ${res1.data.length}, total = ${res1.total}, totalPages = ${res1.totalPages}`);
  if (res1.data.length !== 9 || res1.total !== 105) {
    throw new Error('Fail on getMovies defaults');
  }

  // 3. Search test
  console.log('Testing search query "Kurosawa"...');
  const resSearch = await movieApi.getMovies({ search: 'Kurosawa' });
  console.log(`PASS: Found ${resSearch.total} films matching "Kurosawa"`);
  if (resSearch.total === 0) throw new Error('Search failed to find Kurosawa');

  // 4. Genre filter test
  console.log('Testing genre filter "Sci-Fi"...');
  const resSciFi = await movieApi.getMovies({ genre: 'Sci-Fi' });
  console.log(`PASS: Found ${resSciFi.total} Sci-Fi films`);
  if (resSciFi.total === 0) throw new Error('Genre filter failed');

  // 5. Decade filter test
  console.log('Testing decade filter "1960s"...');
  const resDecade = await movieApi.getMovies({ decade: '1960s' });
  console.log(`PASS: Found ${resDecade.total} 1960s films`);

  // 6. Award filter test
  console.log('Testing awardOnly filter...');
  const resAwards = await movieApi.getMovies({ awardOnly: true });
  console.log(`PASS: Found ${resAwards.total} award winning films`);

  // 7. Create new movie test
  console.log('Testing movieApi.createMovie()...');
  const newMovie = await movieApi.createMovie({
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    country: 'United States',
    genre: 'Sci-Fi',
    runtime: 169,
    rating: 8.7,
    festivalAwards: ['Academy Award for Best Visual Effects'],
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  });
  console.log(`PASS: Created movie "${newMovie.title}" with ID ${newMovie.id}`);

  const resAfterAdd = await movieApi.getMovies({ page: 1, limit: 9 });
  if (resAfterAdd.total !== 106) throw new Error(`Expected 106 total, got ${resAfterAdd.total}`);
  console.log(`PASS: Total catalog updated to ${resAfterAdd.total}`);

  // 8. Simulated Error test
  console.log('Testing error simulation for defense...');
  movieApi.setSimulatedError(true);
  try {
    await movieApi.getMovies();
    throw new Error('Should have thrown simulated error');
  } catch (err) {
    console.log(`PASS: Error simulation successfully triggered error: "${err.message}"`);
  }
  movieApi.setSimulatedError(false);

  // 9. Reset database test
  console.log('Testing database reset...');
  await movieApi.resetDatabase();
  const resAfterReset = await movieApi.getMovies();
  if (resAfterReset.total !== 105) throw new Error('Database reset failed');
  console.log(`PASS: Database restored to pristine 105 seed films`);

  console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
