import mongoose, { Document, Schema } from "mongoose";

export interface IGame extends Document {
  name: string;
  url: string;
  author: string;
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a game name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    url: {
      type: String,
      required: [true, "Please add a game URL"],
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, "Please add a published date"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGame>("Game", GameSchema);
