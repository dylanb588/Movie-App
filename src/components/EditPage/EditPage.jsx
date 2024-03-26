import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';


function EditPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();
    // Gets the movie from redux and pulls out of the array
    const movies = useSelector(store => store.singleMovie)
    const movie = movies[0];

    // Local state for inputs
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);

    // Sends dispatch to SAGA to send the put request to server.
    function handleSave() {
        dispatch({
            type: 'EDIT_MOVIE', payload: {id: id, title: title, description: description}
        });

        history.push(`/`);
    }
    

    return(
        <div>
        <h2>Edit Movie</h2>
        <form onSubmit={handleSave}>
        <Stack direction="column" spacing={2} useFlexGap >
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
        </Stack>
        <Stack direction="center-row" spacing={3} useFlexGap justifyContent="center">
            <Button onClick={() => history.push(`/movies/${movie.id}`)} variant="contained" color="secondary">
                Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </Stack>
        </form>
      </div>
    )
}

export default EditPage;