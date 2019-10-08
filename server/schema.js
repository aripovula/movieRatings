
exports.typeDefs = `

    type Query {
        getCurrentUser: User
        getRating(_id: ID!): Rating
        getAllRatings: [Rating]
        searchRatings(searchTerm: String): [Rating]
    }

    type Mutation {
        addRating(
            movie_id: String,
            visit_date: String,
            movie_rating: String,
            facility_rating: String,
            feedbackText: String,
            feedbackPhoto: String,
            isSatisfied: Boolean   
        ): Rating

        signinUser(email: String!, password: String!): Token
        signupUser(email: String!, password: String!): Token
    }

    type Token {
        token: String!
    }

    type User {
        _id: ID
        email: String! @unique
        password: String!
        ratings: [Rating]
        favorites: [String]
    }

    type Rating {
        _id: ID
        movie_id: String
        visit_date: String!
        movie_rating: String
        facility_rating: String
        feedbackText: String
        feedbackPhoto: String
        isSatisfied: Boolean
    }
`;
