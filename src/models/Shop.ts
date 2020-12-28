import { Schema, Model, Document, model, ObjectId } from 'mongoose';

interface ShopProps extends Document {
    _id: string;
    name: string;
    description: string;
    validated: boolean;
    products: ObjectId[];
};

const ShopSchema: Schema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: String,
    validated: Boolean,
    products: [{
        ref: 'Product',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

const ShopModel: Model<ShopProps> = model('Shop', ShopSchema);
export default ShopModel;