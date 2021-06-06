import passportJwt from 'passport-jwt';
import User from '../model/user';
import { logError } from '../utils/handleError/helpers';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.TOKEN_SECRET}`
};

const jwtPassport = (passport: any) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        login: payload.login,
                        id: payload.id
                    }
                });

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                logError(error);
            }
        })
    );
};

export default jwtPassport;
