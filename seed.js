const db = require("./server/db");
const User = require("./server/db/models/user")


const user = [{
    "email": "test@gmail.com",
    "password": "test123",
    "salt": "",
    "googleId":"",
    "animalPreferences": ["dog"],
    "hasYoungChildren": false,
    "otherPetTypes": ["dog"],
    "zipCode": 78741,
    "phoneNumber": "8007721004",
    "petHistory": "I like animals."
}, {
    "email": "doggo@gmail.com",
    "password": "doggydog",
    "salt": "",
    "googleId":"",
    "animalPreferences": ["dog"],
    "hasYoungChildren": true,
    "otherPetTypes":["dog"],
    "zipCode": 78704,
    "phoneNumber": "5125551234",
    "petHistory": "I think animals are cool."

}, {
    "email": "puppy@gmail.com",
    "password":"puppy",
    "salt":"",
    "googleId":"",
    "animalPreferences":["dog"],
    "hasYoungChildren": false,
    "otherPetTypes":["dog"],
    "zipCode": 78741,
    "phoneNumber":8001234567,
    "petHistory": "I like puppies."

}, {
    "email": "animallvr@gmail.com",
    "password": "animal",
    "salt": "",
    "googleId": "",
    "animalPreferences": ["dog"],
    "hasYoungChildren": true,
    "otherPetTypes":["dog"],
    "zipCode": 12345,
    "phoneNumber": 8005550123,
    "petHistory": "I love all animals."

}]

const seed = () =>
Promise.all(user.map(user =>
  User.create(user))
)
.catch(err => {
  console.log("Error in Promise");
  console.log(err.stack);
})





const main = () => {
console.log("Syncing db...");
db.sync({ force: true })
  .then(() => {
    console.log("Seeding database...");
    return seed();
  })
  .catch(err => {
    console.log("Error while seeding");
    console.log(err.stack);
  })
  .then(() => {
    db.close();
  });
};



main();