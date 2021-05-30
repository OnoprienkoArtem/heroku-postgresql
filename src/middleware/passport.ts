import passportJwt from 'passport-jwt';
import User from '../model/user';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
}

const jwtPassport = (passport: any) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {

                console.log('payload ==> ', payload);

                const user = await User.findOne({
                    // where: {
                    //     login: username,
                    //     password: password,
                    // },
                });

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
}

export default jwtPassport;
