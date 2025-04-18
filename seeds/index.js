const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Conected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "67f7d241e64e36fad795d7cb",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dit2ksvpy/image/upload/v1744706760/YelpCamp/hvu8wkvor3r3z2zb5u1m.png",
          filename: "YelpCamp/hvu8wkvor3r3z2zb5u1m",
        },
        {
          url: "https://res.cloudinary.com/dit2ksvpy/image/upload/v1744706762/YelpCamp/sef0ifnbevmajqae9eno.png",
          filename: "YelpCamp/sef0ifnbevmajqae9eno",
        },
        {
          url: "https://res.cloudinary.com/dit2ksvpy/image/upload/v1744706762/YelpCamp/wezl9qje2lkbi1e0hwez.png",
          filename: "YelpCamp/wezl9qje2lkbi1e0hwez",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet nobis repellat ex quod a corporis ea quibusdam nulla, nisi suscipit similique assumenda, consequatur quam quia beatae ipsum fugiat nostrum? Iusto?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
