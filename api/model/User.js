import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }, 
        role: {
            type: String, 
            default: 'user'
        }
    },
    {
        collection: 'Users'
    })

const User = mongoose.model('Users', UserSchema)
export default User