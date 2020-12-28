import { Schema, model, Document, Model } from 'mongoose';

export interface RoleProps extends Document {
    name: String;
}

const RoleSchema: Schema = new Schema({
    name: String
}, {
    versionKey: false
});

const RoleModel: Model<RoleProps> = model("Role", RoleSchema);
export default RoleModel;