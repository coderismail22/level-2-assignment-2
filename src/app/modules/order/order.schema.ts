import mongoose,{Schema} from "mongoose";
import { TOrder } from "./order.type";

const orderSchema = new Schema<TOrder>({
    email: { type: String,required: true, unique: true };
    productId: { type: String, required: true, unique: true };
    price: { type: number; required: true };
    quantity: { type: number; required: true };
})
