import mongoose, { Schema, Document } from "mongoose";

interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  urlCode: string;
  date: Date;
}

const UrlSchema: Schema = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    urlCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const UrlModel =
  (mongoose.models.UrlSchema as mongoose.Model<IUrl>) ||
  mongoose.model<IUrl>("Url", UrlSchema);

export default UrlModel;
