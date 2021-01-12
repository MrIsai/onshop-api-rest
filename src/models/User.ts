import { Schema, Model, Document, model, ObjectId } from 'mongoose';

export interface UserProps extends Document {
    name: { first: string; last: string; };
    email: string;
    password: string;
    country: string;
    roles: ObjectId[];
};

const UserSchema: Schema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },

        last: {
            type: String,
            required: true
        }
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: { type: String, required: true },

    country: String,

    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],

    identityNumber: String,

    addresses: [{ ref: 'Address', type: Schema.Types.ObjectId }]
}, {
    timestamps: true,
    versionKey: false
});

const UserModel: Model<UserProps> = model('User', UserSchema);
export default UserModel;

