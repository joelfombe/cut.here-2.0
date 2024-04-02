import mongoose, { model, Schema } from "mongoose";

const createUrl = new Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
});

export const createurl = mongoose.models.createUrl || model("createUrl", createUrl);