import { connect } from "mongoose";

async function connectMongoDB() {
    try {
        const response = await connect(process.env.MONGODB_URL!, {});
        console.log("MongoDB connected");
        return true;
    } catch {
        console.error("Something Wet");
        return false;
    }
}

export default connectMongoDB;
