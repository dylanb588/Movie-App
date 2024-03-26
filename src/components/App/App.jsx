import { HashRouter as Router, Route, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import './App.css';
import EditPage from '../EditPage/EditPage';

import { Container } from '@mui/system';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <Router>        
      <Header />
        <Route path="/" exact>
          <Container>
            <MovieList />
          </Container>
        </Route>
        <Route path="/movies/:id" exact>
          <MovieDetails />
        </Route>
        <Route path="/movies/:id/edit">
          <EditPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
