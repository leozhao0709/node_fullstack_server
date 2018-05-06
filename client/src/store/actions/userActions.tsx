export enum UserActionType {
    FETCH_USRER = 'FETCH_USRER',
    FETCH_USER_FINISH = 'FETCH_USER_FINISH',
    ADD_CERDITS = 'ADD_CREDITS'
}

export interface UserAction {
    type: UserActionType;
    // tslint:disable-next-line:no-any
    payload?: any;
}

export const userActions = {
    fetch_user: (): UserAction => {
        return {
            type: UserActionType.FETCH_USRER
        };
    },

    fetch_user_finish: (user): UserAction => {
        return {
            type: UserActionType.FETCH_USER_FINISH,
            payload: user
        };
    },

    add_credits: (token): UserAction => {
        return {
            type: UserActionType.ADD_CERDITS,
            payload: token
        };
    }
};
