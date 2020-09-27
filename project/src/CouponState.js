import React, { useReducer } from 'react';
import CouponReducer from './CouponReducer';
import messages from './messages';
import {
    GET_SESSION,
    SET_SESSION,
    SET_LOGOUT,
    NETWORK_ERROR,
    GET_COUPONS,
    ADD_USER_COUPON,
    ADD_COUPON,
    SET_ALERT,
    UPDATE_COUPON,
    UPDATE_NAME,
    UPDATE_CODE,
    UPDATE_TYPE,
    UPDATE_DESC,
    DELETE_COUPON,
    GET_USER_COUPON,
    DELETE_USER_COUPON,
    SHOW_FAV,
    SHOW_COUPON_DETAILS,
    CATEGORY_FILTER,
    ADD_FORM,
} from './types';

import {
    fetchLoginStatus,
    fetchLogin,
    fetchLogout,
    fetchCoupons,
    fetchAddUserCoupons,
    fetchUserCoupons,
    fetchRemoveUserCoupon,
    fetchUpdateCoupons,
    fetchAddCoupons,
    fetchDeleteCoupon,
    fetchAddForm
} from './services';
import CouponContext from './CouponContext';

import { ADMIN, NAME, CODE, TYPE, DESC, NO_ID_FOUND, FALSE, ALL, NO_VALID_SESSION } from './constants';

const CouponState = (props) => {

    const initialState = {
        isLoggedIn: FALSE,
        isAdmin: FALSE,
        username: '',
        allCoupons: {},
        userCoupons: {},
        networkError: '',
        alert: '',
        showFav: FALSE,
        isCouponDetails: FALSE,
        couponFilter: ALL,
        updatedDataId: '',
    }

    /*Dispatcher calls Reducer by passing the initialstate and returns new state*/
    const [state, dispatch] = useReducer(CouponReducer, initialState);

    /*fetches the login status from services.js then calls
     dispatcher function name+data and calls reducer to get new state*/
    const getLoginStatus = () => {
        fetchLoginStatus().then((userInfo) => {
            dispatch({ type: GET_SESSION, data: userInfo.data });
        })
            .catch((err) => {
                if (err.code !== NO_VALID_SESSION) {
                    updateNetworkError(messages[err.code]);
                }
            });
    }

    /*This function fetches logout from services and calls dispatcher function
     by passing type which calls reducer to get new state & catches network errors if any*/
    const setLogout = () => {
        fetchLogout()
            .then(() => {
                dispatch({ type: SET_LOGOUT })
            })
            .catch(err => {
                updateNetworkError(messages[err.code]);
            });
    }

    /*Fetches all coupons and passess coupons details to dispatcher function */
    const getAllCoupons = () => {
        fetchCoupons()
            .then((couponInfo) => {
                dispatch({ type: GET_COUPONS, data: couponInfo.data })
            })
            .catch(err => {
                updateNetworkError(messages[err.code]);
            });
    }

    
    /*fetches username, id and coupon and passes type and coupon details
    to dispatcher function & catches network error if any*/
    const addUserCoupons = (id) => {
        const coupon = state.allCoupons[id];
        fetchAddUserCoupons(state.username, id, coupon)
            .then((couponInfo) => {
                dispatch({ type: ADD_USER_COUPON, data: couponInfo.data });
            })
            .catch(err => {
                updateNetworkError(messages[err.code]);
            });
    }

    /*Passes type and status to dispatcher function */   
    const setShowFav = (status) => {
        dispatch({ type: SHOW_FAV, data: status })
    }

    /*This function sets the show coupon details status by passing the status to dispatcher function
    reducer sets and returns isCouponDetails new state*/
    const setShowCouponDetails = (status) => {
        dispatch({ type: SHOW_COUPON_DETAILS, data: status })
    }

    const setLoginStatus = (username) => {
        if (!username) {
            updateNetworkError(messages.USERNAME_REQUIRED);
        } else {
            fetchLogin(username)
                .then(() => {
                    if (username === ADMIN) {
                        dispatch({ type: SET_SESSION, data: { username: username, isAdmin: true } });
                    } else {
                        dispatch({ type: SET_SESSION, data: { username: username, isAdmin: false } });
                    }
                })
                .catch(err => {
                    updateNetworkError(messages[err.code]);
                });
        }
    }

    const addCoupons = (name, code, type, desc) => {
        if (checkDetails(name, code, type, desc)) {
            const coupon = {
                name: name,
                code: code,
                type: type,
                description: desc
            }
            fetchAddCoupons(state.username, coupon)
                .then((couponInfo) => {
                    dispatch({ type: ADD_COUPON, data: couponInfo.data });
                })
                .catch(err => {
                    updateNetworkError(messages[err.code]);
                });
            return true;
        }
        return false;
    }

    const checkFormDetails = (username, email, messagetext) => {
        if (!username || !email || !messagetext) {
            setAlert(messages.FIELD_REQUIRED);
            return false;
        }
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        {
            setAlert(messages.EMAIL_VALID);
            return false;
        }
        return true;
    }

    /*Adds User eneterd Message */
    const addMessage = (newuser, email, messagetext) => {
        if (checkFormDetails(newuser, email, messagetext)) {
            const form = {
                newuser: newuser,
                email: email,
                messagetext: messagetext
            }
            
            fetchAddForm(state.username,form)
                .then((formInfo) => {
                    dispatch({ type: ADD_FORM, data: formInfo.data });
                })
                .catch(err => {
                    updateNetworkError(messages[err.code]);
                });

            return true;
        }
        return false;
    }

    const setCategoryFilter = (filterValue) => {
        dispatch({ type: CATEGORY_FILTER, data: filterValue })
    }

    const setAlert = (message) => {
        dispatch({ type: SET_ALERT, data: message });
    }
  
    const updateNetworkError = (errMsg) => {
        const errMessage = errMsg || messages.DEFAULT;
        dispatch({ type: NETWORK_ERROR, data: errMessage });
    }

    const updateCoupons = (id, name, code, type, desc) => {
        const oldCoupon = state.allCoupons[id];

        if ((!name && !oldCoupon.name) || (!code && !oldCoupon.code) || (!type && !oldCoupon.type) || (!desc && !oldCoupon.description)) {
            dispatch({ type: SET_ALERT, data: messages.DATA_EMPTY });
        } else if (state.updatedDataId && id !== state.updatedDataId) {
            dispatch({ type: SET_ALERT, data: messages.UPDATE_FAILED });
        } else {
            const coupon = {
                name: name || oldCoupon.name,
                code: code || oldCoupon.code,
                type: type || oldCoupon.type,
                description: desc || oldCoupon.description
            }
            fetchUpdateCoupons(state.username, id, coupon)
                .then(() => {
                    dispatch({ type: UPDATE_COUPON, data: { coupon: coupon, couponId: id, message: messages.UPDATE_SUCCESS } });
                })
                .catch(err => {
                    updateNetworkError(messages[err.code]);
                });
        }
    }

    const deleteCoupon = (id) => {
        fetchDeleteCoupon(id)
            .then(() => {
                delete state.allCoupons[id];
                dispatch({ type: DELETE_COUPON, data: { coupons: state.allCoupons, message: messages.DELETE_SUCCESS } })
            })
            .catch((err) => {
                if (err.message === NO_ID_FOUND) {
                    delete state.allCoupons[id];
                    dispatch({ type: DELETE_COUPON, data: state.allCoupons })
                    dispatch({ type: SET_ALERT, data: messages[err.message] })
                } else {
                    updateNetworkError(messages[err.code]);
                }
            })
    }

    const checkDetails = (name, code, type, desc) => {
        if (!name || !code || !type || !desc) {
            setAlert(messages.FIELD_REQUIRED);
            return false;
        }
        return true;
    }

    const getUserCoupons = () => {
        fetchUserCoupons(state.username)
            .then((couponInfo) => {
                dispatch({ type: GET_USER_COUPON, data: couponInfo.data });
            })
            .catch(err => {
                updateNetworkError(messages[err.code]);
            });
    }

    const removeUserCoupon = (couponId) => {
        fetchRemoveUserCoupon(state.username, couponId)
            .then((couponInfo) => {
                delete state.userCoupons[couponId];
                dispatch({ type: DELETE_USER_COUPON, data: state.userCoupons });
            })
            .catch(err => {
                updateNetworkError(messages[err.code]);
            });
    }

    const updateCouponState = (type, id, value) => {
        const coupon = state.allCoupons[id];
        switch (type) {
            case NAME:
                return dispatch({ type: UPDATE_NAME, data: { coupon, value, id } });
            case CODE:
                return dispatch({ type: UPDATE_CODE, data: { coupon, value, id } });
            case TYPE:
                return dispatch({ type: UPDATE_TYPE, data: { coupon, value, id } })
            case DESC:
                return dispatch({ type: UPDATE_DESC, data: { coupon, value, id } })
            default:
                return;
        }
    }

    /*Provides context to descendants and overrides the default value*/
    return (
        <CouponContext.Provider
            value={{
                isLoggedIn: state.isLoggedIn,
                isAdmin: state.isAdmin,
                username: state.username,
                allCoupons: state.allCoupons,
                userCoupons: state.userCoupons,
                networkError: state.networkError,
                alert: state.alert,
                showFav: state.showFav,
                isCouponDetails: state.isCouponDetails,
                couponFilter: state.couponFilter,
                updatedDataId: state.updatedDataId,
                getLoginStatus,
                setLoginStatus,
                setLogout,
                getAllCoupons,
                getUserCoupons,
                removeUserCoupon,
                addCoupons,
                deleteCoupon,
                addMessage,
                updateCoupons,
                addUserCoupons, 
                updateCouponState,
                setAlert,
                setShowFav,
                setShowCouponDetails,
                setCategoryFilter
            }}
        >
            {props.children}
        </CouponContext.Provider >
    )
}

export default CouponState;