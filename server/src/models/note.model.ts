import * as mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  description: string;
  createdDate: date;
  isArchived: boolean;
}

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, required: true },
  isArchived: { type: Boolean, required: true}
});

export const Note = mongoose.model<INote>("Note", noteSchema);
