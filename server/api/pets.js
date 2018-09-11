const router = require('express').Router();
const axios = require('axios');

const petfinderKey = '01e0c19609326eb33ed70df84f870392';

module.exports = router;

router.get('/', (req, res, next) => {
  let queryStr = 'output=full&format=json';
  Object.keys(req.query).forEach((variable) => {
    if (req.query[variable] && req.query[variable] !== 'undefined') queryStr += `&${variable}=${req.query[variable]}` || '';
  });
  axios.get(`http://api.petfinder.com/pet.getRandom?key=${petfinderKey}&${queryStr}&_ts=${Date.now()}`, {
    headers: {pragma: "no-cache", "cache-control": "no-cache"}
  })
  .then((allPets) => {
    res.json(allPets.data.petfinder.pet);
    res.end();
  }).catch(next);
});

router.get('/findById/:petId', (req, res, next) => {
  const petId = req.params.petId;
  axios.get(`http://api.petfinder.com/pet.get?format=json&key=${petfinderKey}&id=${petId}`)
    .then((pet) => {
      res.json(pet.data.petfinder.pet);
      res.end();
    }).catch(next);
});