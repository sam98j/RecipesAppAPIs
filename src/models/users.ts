import mongoose, {Model} from 'mongoose'
import { User } from '../interfaces/users'

// User Schema
const userSchema = new mongoose.Schema<User, Model<User>>({
    posts: [],
    name: String,
    avatar: String,
    followers: [],
    following: [],
    password: String,
    email: String
})

// User Model
const userModel = mongoose.model("users", userSchema);
// export userModel
export default userModel;