const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Gets the genres assosciated with the movie clicked on.
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  const query = `
  SELECT *
  FROM genres
  JOIN movies_genres ON genres.id = movies_genres.genre_id
  WHERE movies_genres.movie_id = $1;
  `;

  // Uses the movie id to find it's genres.
  pool.query(query, [movieId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.error('ERROR: Get genres for movie', err);
      res.sendStatus(500);
    });
});

module.exports = router;