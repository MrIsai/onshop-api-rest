import { Schema, Model, Document, model } from 'mongoose';

interface ProductProps extends Document {
    name: string;
    price: number;
    available: number;
    description: string;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: Number,
    available: Number,
    description: String
}, {
    timestamps: true
});

const ProductModel: Model<ProductProps> = model('Product', ProductSchema);
export default ProductModel;