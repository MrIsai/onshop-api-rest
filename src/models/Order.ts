import { Schema, Model, Document, model, ObjectId } from 'mongoose';

interface OrderProperties extends Document {
    shop: string;
    user: string;
    products: string[];
}

const OrderSchema: Schema = new Schema({
    shop: { ref: 'Shop', type: Schema.Types.String },
    user: { ref: 'User', type: Schema.Types.ObjectId },
    products: [{
        ref: 'Product', type: Schema.Types.ObjectId
    }],
}, {
    timestamps: true,
});

const OrderModel: Model<OrderProperties> = model('Order', OrderSchema);