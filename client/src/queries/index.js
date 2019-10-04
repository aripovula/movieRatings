import { gql } from "apollo-boost";

export const GET_ALL_RATINGS = gql`
	query {
		getAllRatings {
			movie_id
			visit_date
			movie_rating
			facility_rating
			feedbackText
			feedbackPhoto
			isSatisfied
		}
	}
`;

export const SIGNUP_USER = gql`
	mutation($email: String!, $password: String!) {
		signupUser(email: $email, password: $password) {
			token
		}
	}
`;

export const SIGNIN_USER = gql`
	mutation($email: String!, $password: String!) {
		signinUser(email: $email, password: $password) {
			token
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			email
            favorites
		}
	}
`;
