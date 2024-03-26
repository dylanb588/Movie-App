const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GETS all the movies for the movie list
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
// GETS the moive detailed for just the one clicked on.
router.get('/:id', (req, res) => {
  const movieID = parseInt(req.params.id);

  const movieQuery = `
  SELECT * FROM "movies"
    WHERE "id" = $1;
  `;
  pool.query(movieQuery, [movieID])
    .then(result => {
      res.send(result.rows)
    })
    .catch(err => {
      console.log('ERROR: Get selected movie:', err);
    }) 
})
// Updates the database to what the user inputs
router.put('/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const movieUpdate = `
  UPDATE "movies"
    SET "title" = $1, "description" = $2
    WHERE "id" = $3;
  `;

  const values = [title, description, id];
  pool.query(movieUpdate, values)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('ERROR: Updating movie:', err);
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
