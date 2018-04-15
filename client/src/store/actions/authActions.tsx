export enum AuthActionType {
    FETCH_USRER = 'FETCH_USRER',
    FETCH_USER_FINISH = 'FETCH_USER_FINISH'
}

export interface AuthAction {
    type: AuthActionType;
    user?: { _id: string, email: string } | null;
}

export const AuthActions = {
    fetch_user: (): AuthAction => {
        return {
            type: AuthActionType.FETCH_USRER
        };
    },

    fetch_user_finish: (user): AuthAction => {
        return {
            type: AuthActionType.FETCH_USER_FINISH,
            user,
        };
    }
};