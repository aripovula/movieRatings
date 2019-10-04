const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const {email} = user;
    return jwt.sign({ email}, secret, {expiresIn})
}

exports.resolvers = {

    Query: {
        getCurrentUser: async (root, args, {currentUser, User}) => {
            if (!currentUser) return null;
            console.log('currentUser - ', currentUser);
            
            return await User.findOne({email: currentUser.email})
                .populate({
                    path: 'ratings',
                    model: 'Rating'
                });
        },
        getAllRatings: async (root, args, {Rating}) => {
            return await Rating.find();
        }
    },

    Mutation: {
        addRating: async (
            root, 
            {
                movie_id,
                visit_date,
                movie_rating,
                facility_rating,
                feedbackText,
                feedbackPhoto,
                isSatisfied
            },
            {Rating}
        ) => {
            const newRating = await new Rating({
                movie_id,
                visit_date,
                movie_rating,
                facility_rating,
                feedbackText,
                feedbackPhoto,
                isSatisfied
            }).save();
            return newRating;
        },

        signinUser: async(root, {email, password}, {User}) => {
            console.log('email, password}, {User} - ', email, password, User);
            
            const user = await User.findOne({email});
            if (!user) throw new Error('User not found');
            if (password != user.password) throw new Error('Password not valid');
            if (password == user.password) return {token: createToken(user, process.env.SECRET, '1hr')}
        },

        signupUser: async(root, {email, password}, {User}) => {
            const user = await User.findOne({email});
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                email,
                password
            }).save();
            return {token: createToken(newUser, process.env.SECRET, '1hr')}
        }
    }
};