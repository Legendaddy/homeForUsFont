import {BANK_ACCOUNT_ACTIVATION, BANK_ACCOUNT_CREATED, BANK_ACCOUNT_RECOVERED, 
    BANK_ACCOUNT_UPDATED, BANK_NAME_RECOVERED, BANK_REQUEST_ERROR, BANK_REQUEST_SUBMIT, 
    BANK_STANDARD_BUDGET_CREATED, BANK_STANDARD_BUDGET_DELETED, BANK_STANDARD_BUDGET_RECOVERED, 
    BANK_STANDARD_BUDGET_UPDATED, BANK_TYPE_RECOVERED, BANK_SPENDING_RECOVERED, BANK_MONTH_BUDGET_CREATED, 
    BANK_MONTH_BUDGET_RECOVERED, BANK_MONTH_BUDGET_UPDATED, BANK_MONTH_BUDGET_DELETED, 
    BANK_MONTH_BUDGET_GENERATED, BANK_OPERATION_RECOVERED, BANK_OPERATION_ADDED, BANK_OPERATION_UPDATED, 
    BANK_OPERATION_DELETED, BANK_OPERATION_UPLOAD_RECOVERED, BANK_OPERATION_UPLOAD_DELETED, BANK_OPERATION_UPLOAD_FILE, BANK_OPERATION_UPLOAD_UPDATED} from './type'

const initialStateBank = {
    isloading : false,
    bank:[],
    standard:[],
    monthBudget:[],
    accounts:[],
    spending:[],
    type:[],
    operations: [],
    operationsUpload: [],
};

const bankReducer = (state= initialStateBank, action) => {
    switch(action.type){
        case BANK_REQUEST_ERROR: 
            return {
                ...state,
                isloading: false,
                msg:action.payload
            };
        
        case BANK_REQUEST_SUBMIT:
            return {
                ...state,
                isloading: true
            };

        case BANK_SPENDING_RECOVERED:
            let spending = [];
            action.payload.map(spend => {
                spending.push({value: spend.id, label: spend.cluster.concat("-", spend.spending)});
            });
            return {
                ...state,
                spending: spending
            }; 
        
        case BANK_TYPE_RECOVERED:
            let types = []
            action.payload.map(type => {
                types.push({value: type.id, label: type.cost.concat("-", type.name_type)});
            });
            return {
                ...state,
                type: types
            };
        
        case BANK_ACCOUNT_RECOVERED:
        case BANK_ACCOUNT_CREATED:
        case BANK_ACCOUNT_ACTIVATION:
        case BANK_ACCOUNT_UPDATED:
            return {
                ...state,
                isloading: false,
                accounts: action.payload
            };
        
        case BANK_STANDARD_BUDGET_CREATED:
        case BANK_STANDARD_BUDGET_RECOVERED:
        case BANK_STANDARD_BUDGET_UPDATED:
        case BANK_STANDARD_BUDGET_DELETED:
            return {
                ...state,
                isloading: false,
                standard: action.payload
            };

        case BANK_MONTH_BUDGET_CREATED:
        case BANK_MONTH_BUDGET_RECOVERED:
        case BANK_MONTH_BUDGET_UPDATED:
        case BANK_MONTH_BUDGET_DELETED:
        case BANK_MONTH_BUDGET_GENERATED:
            return {
                ...state,
                monthBudget: action.payload
            };

        case BANK_NAME_RECOVERED:
            return {
                ...state,
                isloading: false,
                bank: action.payload
            };
        
        case BANK_OPERATION_RECOVERED:
        case BANK_OPERATION_ADDED:
        case BANK_OPERATION_UPDATED:
        case BANK_OPERATION_DELETED:
            return {
                ...state,
                isloading: false,
                operations: action.payload
            };
        
        case BANK_OPERATION_UPLOAD_RECOVERED:
        case BANK_OPERATION_UPLOAD_FILE:
        case BANK_OPERATION_UPLOAD_UPDATED:
        case BANK_OPERATION_UPLOAD_DELETED:
            data = action.payload
            return {
                ...state,
                isloading: false,
                operationsUpload: action.payload
            }
        
        default: return state;

    };
};

export default bankReducer;