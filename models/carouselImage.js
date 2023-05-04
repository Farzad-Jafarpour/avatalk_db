const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const carouselSchema = new Schema({
  imageName: { type: String },
});

const CarouselImage = mongoose.model("Carousel", carouselSchema);

function validateCarouselImage(CarouselImage) {
  const schema = Joi.object({
    imageName: Joi.string().max(500),
  });

  return schema.validate(CarouselImage);
}

exports.CarouselImage = CarouselImage;
exports.validate = validateCarouselImage;
