import { Document, Schema, Model, model} from "mongoose";
import {IRegularExpression} from "../../client/src/app/models/IRegularExpressionModel";
import {ObjectID} from "bson";

export interface IRegularExpressionModelDB extends IRegularExpression, Document {
    id : any
}

export let RegularExpressionSchema: Schema = new Schema({
    id : ObjectID,
    regularExpression : String
});

export const RegularExpression: Model<IRegularExpressionModelDB> = model<IRegularExpressionModelDB>("User", RegularExpressionSchema);