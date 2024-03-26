import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_SELECTED_MOVIE', selectedMovie);
  yield takeEvery('FETCH_GENRES', fetchAllGenres);
  yield takeEvery('EDIT_MOVIE', editMovie)
}

// Gets all the movies for the MovieList.
function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}
// Gets just a single movie's deatils.
function* selectedMovie(action) {
  try {
    const movieID = action.payload;
    const response = yield axios.get(`/api/movies/${movieID}`)

    yield put({type: 'SET_SELECTED_MOVIE', payload: response.data});
  } catch (error) {
    console.log('Error getting single movie:', error);
  }
  
}
// Sends the put to update the movie.
function* editMovie(action) {
  try {
    console.log('Here be action', action);
    const { id, title, description } = action.payload;

    yield axios.put(`/api/movies/${id}/edit`, {title, description});
    yield put({type: 'FETCH_MOVIES'});
  } catch (error) {
    console.log('Error editing movie:', error);
  }
}
// Gets the genres for the movie clicked on.
function* fetchAllGenres(action) {
  try {
    const movieID = action.payload;
    const genresResponse = yield axios.get(`/api/genres/${movieID}`)

    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (error) {
    console.log('Fetch genres error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}
// Returns just a single movie by id.
const singleMovie = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres of the movie clicked on.
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    singleMovie
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
