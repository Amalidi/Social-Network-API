const { Schema, model } = require("mongoose");
const moment = require("moment");

const reactionSchema = require("./Reactions");

const thoughtSchema = {
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    required: true,
    default: moment(),
  },
  userName: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
};

const schema = new Schema(thoughtSchema, {
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

schema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", schema);

module.exports = Thought;
