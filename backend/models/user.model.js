import mongoose from 'mongoose';
import createSchema from "../schema/BaseSchema";
import { User } from "../schema/User";

const userSchema = createSchema(User, false, 'users');

//function static
userSchema.statics.getUserByUsername = async function (user, populate) {
    let retUser = this.findOne({ user });
    if (populate) {
        if (Array.isArray(populate)) {
            populate.forEach(i => retUser.populate(i))
        } else {
            retUser.populate(populate);
        }
    }
    retUser = await retUser.exec()
    return retUser ? retUser.toObject() : null;
}

export default mongoose.model('User', userSchema);