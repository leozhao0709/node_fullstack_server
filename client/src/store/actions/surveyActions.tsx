export enum SurveyActionType {
    SEND_SURVEY = 'SEND_SURVEY'
}

export interface SurveyAction {
    type: SurveyActionType;
    payload?: {};
}

export const SurveyActions = {
    sendSurvey: (survey): SurveyAction => {
        return {
            type: SurveyActionType.SEND_SURVEY,
            payload: survey
        };
    }
};
