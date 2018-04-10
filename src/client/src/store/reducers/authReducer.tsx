import { AuthAction, AuthActionType } from '../actions/authActions';

export interface AuthState {
    user?: { _id: string, email: string } | null;
}

const initialState: AuthState = {
    user: undefined,
};

const AuthReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.FETCH_USER_FINISH:
            return {
                user: action.user
            };
        default:
            return state;
    }
};

export default AuthReducer;