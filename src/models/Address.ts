import { Schema, Model, Document, model, ObjectId } from 'mongoose';

interface AddressInterface extends Document {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number;
    };

    city: string;
    street: string;
    region: string;
    postalCode: string;
    country: string;
    name: string;
    district: string;
}

const AddressSchema: Schema = new Schema({
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number
    },

    city: String,
    street: String,
    region: String,
    postalCode: String,
    country: String,
    name: String,
    district: String
}, {
    timestamps: true,
    versionKey: false
});

const AddressModel: Model<AddressInterface> = model('Address', AddressSchema);
export default AddressModel;