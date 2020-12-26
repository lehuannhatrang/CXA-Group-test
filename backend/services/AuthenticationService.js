import {IndexConfig} from '../configs';
import {ObUtil} from '../utils';
import { UserModel} from '../models';
const CasStrategy = require('passport-cas').Strategy;
class AuthenticationService {
    // serial User
    static serializeUser(user, done) {
        // lay ghi du lieu ra ngoai
        done(null, user);
    }

    // deserialLize
    static deserializeUser(user, done) {
        // get user by Id
        let userId = ObUtil.toObjectIdMongo(user._id);
        // get user by id
        UserModel.getById(userId).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }
            // set atrribute
            return done(null, user);
        }, (err) => {
            return done(err);
        });
    }
}

export default AuthenticationService;