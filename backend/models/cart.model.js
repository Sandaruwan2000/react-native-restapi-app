import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productBrand: {
        type: String,
    },
    productStock: {
        type: String,
    },
    productSizes: {
        type: [String],
    },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
