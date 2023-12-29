// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    selectedAge: '',
    selectedModule: '',
    user: null,
    companyList: [],
    selectedCompanyId: '',
    selectedBranchId: '',
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SELECTED_AGE':
            return {
                ...state,
                selectedAge: action.payload,
            };
        case 'SET_SELECTED_COMPANY':
            return {
                ...state,
                selectedCompanyId: action.payload,
            };
        case 'SET_SELECTED_BRANCH':
            return {
                ...state,
                selectedBranchId: action.payload,
            };
        case 'SET_SELECTED_MODULE':
            return {
                ...state,
                selectedModule: action.payload,
            };
        case 'LOGOUT':
            return {
                ...initialState, // Reset state to its initial values
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,// Reset state to its initial values
            };
        case 'SET_COMPANY_LIST':
            return {
                ...state,
                companyList: action.payload,// Reset state to its initial values
            };
        default:
            return state;
    }
}

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
