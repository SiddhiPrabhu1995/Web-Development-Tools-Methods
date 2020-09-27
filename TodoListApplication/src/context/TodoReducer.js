import {
    GET_SESSION,
    SET_SESSION,
    GET_THEME,
    SET_THEME,
    GET_TODO,
    SET_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    SET_LOGOUT,
    STATUS_FILTER,
    ORDER_FILTER,
    REFRESH_TASKS,
    REPORT_ERROR,
    DONE_FILTER,
    NETWORK_ERROR
} from './types';

import constants from './Constants';

export default (state, action) => {
    state = { ...state, error: '', networkError: '' };
    switch (action.type) {
        case GET_SESSION:
            if (!action.data.username) {
                return {
                    ...state,
                    isLoggedIn: constants.FALSE,
                }
            }
            return {
                ...state,
                isLoggedIn: constants.TRUE,
                username: action.data.username,
                theme: action.data.theme
            }
        case SET_SESSION:
            return {
                ...state,
                username: action.data,
                isLoggedIn: constants.TRUE
            }
        case SET_LOGOUT:
            return {
                ...state,
                isLoggedIn: constants.FALSE,
                tasks: {},
                theme: constants.DEFAULT_THEME
            }
        case GET_THEME:
            return {
                ...state,
                theme: action.data
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.data
            }
        case GET_TODO:
            return {
                ...state,
                tasks: action.data
            }
        case SET_TODO:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.data.taskId]: {
                        name: action.data.name,
                        done: action.data.done,
                        taskId: action.data.taskId
                    }
                }
            }
        case TOGGLE_TODO:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.data.taskId]: { ...action.data }
                }
            }
        case DELETE_TODO:
            return {
                ...state,
                tasks: action.data
            }
        case UPDATE_TODO:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.data.taskId]: { ...action.data, name: action.data.name }
                }
            }
        case STATUS_FILTER:
            return {
                ...state,
                taskStatusFilter: action.data
            }
        case ORDER_FILTER:
            return {
                ...state,
                taskOrderFilter: action.data
            }
        case REFRESH_TASKS:
            return {
                ...state,
                taskStatusFilter: constants.ALL,
                taskOrderFilter: constants.SELECT,
                taskDoneFilter: constants.SELECT
            }
        case DONE_FILTER:
            return {
                ...state,
                taskDoneFilter: action.data.status,
                taskStatusFilter: constants.ALL,
                taskOrderFilter: constants.SELECT,
            }
        case REPORT_ERROR:
            return {
                ...state,
                error: action.data,
            }
        case NETWORK_ERROR:
            return {
                ...state,
                networkError: action.data,
                isLoggedIn: constants.FALSE
            }
        default:
            return state;
    }
};

