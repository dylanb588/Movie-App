import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';

function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const movies = useSelector(store => store.singleMovie);
    const genres = useSelector(store => store.genres);

    console.log('Heres id on movie details ----', id);

    // Calls the SAGA to get the movie's details and genres.
    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });

        dispatch({ type: 'FETCH_GENRES', payload: id });
    }, [dispatch, id]);


    // Sending back one movie item so I get it out of the array.
    const movie = movies[0];
    
    return(
        <Card sx={{ width: 500, margin: 'auto', padding: 2 }}>
            <CardContent>
            <Typography variant="h3" gutterBottom>
                Movie Details
            </Typography>
            {movie && (
                <Stack direction="column" spacing={2}>
                    <Typography variant="h4" component="h4">{movie.title}</Typography>
                        <CardMedia
                            component="img"
                            height="580"
                            image={movie.poster}
                            alt={movie.title}
                        />
                <Stack direction="row" spacing={1} justifyContent="center" color="blue">
                    {genres.map(genre => (
                    <Typography key={genre.id} variant="body2">({genre.name})</Typography>
                    ))}
                </Stack>
                    <Typography variant="body1">{movie.description}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/movies/${movie.id}/edit`)}
                    >
                        Edit
                    </Button>
                </Stack>
            )}
            </CardContent>
        </Card>
    )
}

export default MovieDetails;