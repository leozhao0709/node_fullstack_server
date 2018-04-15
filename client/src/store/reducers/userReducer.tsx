import { UserAction, UserActionType } from '../actions/userActions';

export interface AuthState {
    user?: { _id: string, email: string, credits: number } | null;
}

const initialState: AuthState = {
    user: null,
};

const AuthReducer = (state = initialState, action: UserAction): AuthState => {
    switch (action.type) {
        case UserActionType.FETCH_USER_FINISH:
            return {
                user: action.payload
            };
        default:
            return state;
    }
};

export default AuthReducer;