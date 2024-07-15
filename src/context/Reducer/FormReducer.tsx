import { SET_DBCONNECTION, SET_DBTABLES, SET_TABLE, SET_TABLE_ROW, UPDATE_DBTABLES, SET_TABLE_DATA, UPDATE_TABLE_DATA } from "../../constant/actionTypes/ReducerActionType";

const formReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_DBCONNECTION:
            return {
                ...state,
                dbConnection: { ...state.dbConnection, [payload.fieldName]: payload.value }
            };
        case UPDATE_DBTABLES:
            return {
                ...state,
                selectionTableRow: {
                    ...state.selectionTableRow,
                    [payload.fieldName]: payload.value
                }
            };
        case SET_TABLE_DATA:
            return {
                ...state,
                tableData: payload
            };
        case UPDATE_TABLE_DATA:
            console.log("tableData");
            console.log(payload);
            return {
                ...state,
                tableData: state.tableData.map((row) => {
                    console.log(row, payload);
                    if (row.id === payload.id) {
                        console.log(row, payload);
                        return [...row, ...payload];
                    }
                    return row;
                })
            };
        case SET_TABLE:
            return {
                ...state,
                selectionTable: payload
            };
        case SET_TABLE_ROW:
            return {
                ...state,
                selectionTableRow: payload
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
