import mongoose from "mongoose";
const Schema = mongoose.Schema;

let TokenBlackListSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        collection: 'TokenBlackList'
    })

const TokenBlackList = mongoose.model('TokenBlackList', TokenBlackListSchema);
export default TokenBlackList