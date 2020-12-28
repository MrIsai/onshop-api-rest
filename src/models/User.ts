import { Schema, Model, Document, model, ObjectId } from 'mongoose';

interface User extends Document {
    name: { first: string; last: string; };
    email: string;
    password: string;
    roles: ObjectId[]
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
    password: {
        type: String,
        required: true
    },

    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],

    shops: [{
        ref: "Shop",
        type: String
    }]
}, {
    timestamps: true,
    versionKey: false
});

const UserModel: Model<User> = model('User', UserSchema);
export default UserModel;

