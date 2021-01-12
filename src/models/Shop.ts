import { Schema, Model, Document, model, ObjectId } from 'mongoose';

export interface ShopProperties extends Document {
    _id: string;
    name: string;
    description: string;
    validated: boolean;
    products: ObjectId[];
};

const ShopSchema: Schema = new Schema({
    _id: String,
    name: { type: String, required: true },
    description: String,
    validated: Boolean,
    boss: { ref: "User", type: Schema.Types.ObjectId },
    products: [{ ref: 'Product', type: Schema.Types.ObjectId }],

    background: String, // url where the image is stored
    brandLogo: String,

    themes: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        colors: {
            background: String,
            title: String,
            text: String,
            border: String,
            button: String,
        }
    }],

    design: {
        productView: {
            borderRadius: Number,
            marginVertical: Number,
            marginHorizontal: Number
        },
    }
}, {
    timestamps: true,
    versionKey: false
});

const ShopModel: Model<ShopProperties> = model('Shop', ShopSchema);
export default ShopModel;