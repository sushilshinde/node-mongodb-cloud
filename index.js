require("dotenv").config();
const mongoose = require("mongoose");
const schema = require("./schema.js");
const Reviews = mongoose.model(
    "listingsAndReviews",
    schema,
    "listingsAndReviews"
);

const DB = "sample_airbnb";
const MONGO_FLAGS = "retryWrites=true&w=majority";
const connectionString = process.env.MONGO_ATLAS_URL + DB + "?" + MONGO_FLAGS;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

async function findReviews(query) {
    return await Reviews.findOne(query);
}

(async () => {
    const connector = mongoose.connect(connectionString, options);
    const username = process.argv[2].split("=")[1];

    let user = await connector.then(async () => {
        return findReviews({
            bedrooms: 2
        });
    });

    console.log(user);
    process.exit(0);
})();