import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './MovieList.css';

import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
        {movies.map(movie => {
          return (
            <Card key={movie.id} sx={{  width: 270 }} className="card" style={{backgroundColor: "darkgrey"}}>
              <CardActionArea>
                <Link to={`/movies/${movie.id}`}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={movie.poster}
                    alt={movie.title}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
        </Stack>
    </main>
  );
}

export default MovieList;
