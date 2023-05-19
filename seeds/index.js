const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const descr = require("./descr");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Mongo OK!");
  })
  .catch((err) => {
    console.log("Shit Mongo NOK!");
    console.log(err);
  });

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      owner: "6458df3b40f568f24b4b7a50",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dywxkwcei/image/upload/v1683819061/yelpcamp/ozma7enznhlbvxmpntku.jpg",
          filename: "yelpcamp/ozma7enznhlbvxmpntku",
        },
        {
          url: "https://res.cloudinary.com/dywxkwcei/image/upload/v1683819061/yelpcamp/ccv4xs95uajghxrjheoy.jpg",
          filename: "yelpcamp/ccv4xs95uajghxrjheoy",
        },
      ],
      description: sample(descr),
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
