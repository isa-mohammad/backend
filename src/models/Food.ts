import mongoose, { Schema, Document, Types } from "mongoose";

interface FoodItem extends Document {
    item: string;
    quantity: number;
    user: Types.ObjectId;
}
const foodSchema = new Schema<FoodItem>({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


export default mongoose.model<FoodItem>("Food", foodSchema)