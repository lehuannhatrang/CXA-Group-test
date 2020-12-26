import jwt from 'jsonwebtoken';
import { CommonConfig } from '../configs';

class TokenUtil {
    static async decodeToken(token, key) {
        try {
            return await jwt.verify(token, key);
        } catch (err) {
            throw new Error('Invalid Token')
        }
    }

    static async createToken(user, secret) {
        //can get role
        const { id } = user;
        return await jwt.sign({ sub: id, name: user.user}, secret, { expiresIn: CommonConfig.MAX_AGE_SESSION });
    }
}

export default TokenUtil;