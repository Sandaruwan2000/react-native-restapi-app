import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true, 
  },
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
    default: '', 
  },
  productStock: {
    type: String,
    default: 'IN STOCK', 
  },
  productSizes: {
    type: [String],
    default: [], 
  },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
