import { SET_DBCONNECTION } from "../../constant/actionTypes/ReducerActionType";

const formReducer = (state, {type,payload}) => {
    switch (type) {
        case SET_DBCONNECTION:
            return {
                ...state,
                dbConnection: {...state.dbConnection, [payload.fieldName]: payload.value }
            };
        case 'CLEAR_FORM':
            return {
                ...state,
                dbConnection: null,
                registerForm: null,
                forgotPasswordForm: null,
                resetPasswordForm: null,
                changePasswordForm: null,
                globalForm: null,
                advertForm: null,
            };
        default:
            return state;
    }
};

export default formReducer;
