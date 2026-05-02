import mongoose, { Document, Schema } from 'mongoose';

export interface IHobby extends Document {
  name: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const HobbySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a hobby name'],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description can not be more than 500 characters']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHobby>('Hobby', HobbySchema);
