import { Document, Schema, Model, model} from "mongoose";
import {ILogModel} from "../../client/src/app/models/ILogModel";
import {ObjectID} from "bson";
import {RegularExpression} from "./RegularExpressionSchema";

export interface ILogModalDB extends ILogModel, Document {
    id : any
}

export let LogSchema: Schema = new Schema({
    createdAt: Date,
    id:String,
    name : String,
    path : String,
    regularExpressions : [],
    typeRolling: String,
    typeSpecial : String,
    startLine : String,
    endLine : String
});
LogSchema.pre("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const Log: Model<ILogModalDB> = model<ILogModalDB>("Log", LogSchema);