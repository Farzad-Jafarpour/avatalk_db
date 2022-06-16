const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: { type: String, minlength: 5, maxlength: 50 },
  description: { type: String, minlength: 5, maxlength: 500 },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    description: Joi.string().min(5).max(500),
  });

  return schema.validate(card);
}

exports.Card = Card;
exports.validate = validateCard;
