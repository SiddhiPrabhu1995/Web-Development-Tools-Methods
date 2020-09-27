import {
    FALSE,
    TRUE,
    ADMIN,
    ALL
} from './constants';

import {
    GET_SESSION,
    SET_SESSION,
    SET_LOGOUT,
    NETWORK_ERROR,
    ADD_COUPON,
    UPDATE_COUPON,
    ADD_FORM,
    SET_ALERT,
    GET_COUPONS,
    ADD_USER_COUPON,
    GET_USER_COUPON,
    DELETE_USER_COUPON,
    DELETE_COUPON,
    SHOW_FAV,
    UPDATE_NAME,
    UPDATE_CODE,
    UPDATE_TYPE,
    UPDATE_DESC,
    SHOW_COUPON_DETAILS,
    CATEGORY_FILTER,
} from './types';

import messages from './messages';

/* Reducer function takes previous state, takes action and returns a new state*/
const CouponReducer = (state, action) => {
    state = { ...state, couponFilter: ALL, networkError: '', alert: '', updatedDataId: '' }
    switch (action.type) {
        case GET_SESSION:
            if (!action.data.username) {
                return {
                    ...state,
                    isLoggedIn: FALSE,
                }
            }
           
            if (action.data.username === ADMIN) {
                return {
                    ...state,
                    isLoggedIn: TRUE,
                    isAdmin: TRUE,
                    username: action.data.username,
                }
            } else {
                return {
                    ...state,
                    isLoggedIn: TRUE,
                    username: action.data.username,
                }
            }
        case SET_SESSION:
            return {
                ...state,
                username: action.data.username,
                isAdmin: action.data.isAdmin,
                isLoggedIn: TRUE
            }
        case SET_LOGOUT:
            return {
                ...state,
                isLoggedIn: FALSE,
                showFav: FALSE,
                isCouponDetails: FALSE
            }
        case GET_COUPONS:
            return {
                ...state,
                allCoupons: action.data
            }
        case GET_USER_COUPON:
            return {
                ...state,
                userCoupons: action.data
            }
        case ADD_USER_COUPON:
            return {
                ...state,
                userCoupons: {
                    ...state.userCoupons,
                    [action.data.couponId]: action.data,
                },
                alert: messages.COUPON_SAVED
            }
        case DELETE_USER_COUPON:
            return {
                ...state,
                userCoupons: action.data,
            }
        case UPDATE_COUPON:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.couponId]: {
                        name: action.data.coupon.name,
                        code: action.data.coupon.code,
                        type: action.data.coupon.type,
                        description: action.data.coupon.description,
                        couponId: action.data.couponId
                    }
                },
                alert: action.data.message
            }
        case DELETE_COUPON:
            return {
                ...state,
                allCoupons: action.data.coupons,
                alert: action.data.message
            }
        case ADD_COUPON:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.couponId]: action.data
                }
            }
        case ADD_FORM:
            return {
                    ...state,
                    allForm: {
                        ...state.allForm,
                        [action.data.couponId]: action.data
                    }
                }
        case SET_ALERT:
            return {
                ...state,
                alert: action.data
            }
        case SHOW_FAV:
            return {
                ...state,
                showFav: action.data
            }
        case SHOW_COUPON_DETAILS:
            return {
                ...state,
                isCouponDetails: action.data
            }
        case UPDATE_NAME:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.coupon.couponId]: { ...action.data.coupon, name: action.data.value }
                },
                updatedDataId: action.data.id
            }
        case UPDATE_CODE:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.coupon.couponId]: { ...action.data.coupon, code: action.data.value }
                },
                updatedDataId: action.data.id
            }
        case UPDATE_TYPE:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.coupon.couponId]: { ...action.data.coupon, type: action.data.value }
                },
                updatedDataId: action.data.id
            }
        case UPDATE_DESC:
            return {
                ...state,
                allCoupons: {
                    ...state.allCoupons,
                    [action.data.coupon.couponId]: { ...action.data.coupon, description: action.data.value }
                },
                updatedDataId: action.data.id
            }
        case CATEGORY_FILTER:
            return {
                ...state,
                couponFilter: action.data
            }
        case NETWORK_ERROR:
            return {
                ...state,
                networkError: action.data,
                isLoggedIn: FALSE
            }
        default:
            return state;
    }
}

export default CouponReducer;