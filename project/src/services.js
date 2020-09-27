/*Returns network code and err */
const convertNetworkError = (err) => {
    return {
        code: 'network',
        err
    };
};

/*If 401 response than gives an error. If 200 OK than sends response as json object */
const checkResponse = (response) => {
    if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
    }
    return response.json();
}

/*1-> Fetches the /session using GET method to get the login status
 200OK or 401 Unauthorized client error and checks response
  2-> Catches network error and calls convertNetworkError*/
export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then((checkResponse))
};

export const fetchLogin = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(convertNetworkError)
        .then((checkResponse))
};

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
        .catch(convertNetworkError)
        .then((checkResponse))
};

/*fetches coupons from server using GET method and catches the network error*/
export const fetchCoupons = () => {
    return fetch('/coupons', {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchUserCoupons = (username) => {
    return fetch(`/coupons/${username}`, {
        method: 'GET'
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchAddUserCoupons = (username, couponId, coupons) => {
    return fetch(`/coupons/${username}/${couponId}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ coupons })
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchRemoveUserCoupon = (username, couponId) => {
    return fetch(`/coupons/${username}/${couponId}`, {
        method: 'DELETE'
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchAddCoupons = (username, coupons) => {
    return fetch(`/coupons/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ coupons })
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchAddForm = (username, form) => {
    return fetch(`/form/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ form })
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchUpdateCoupons = (username, couponId, coupons) => {
    return fetch(`/coupons/${username}/${couponId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ coupons })
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}

export const fetchDeleteCoupon = (couponId) => {
    return fetch(`/coupons/${couponId}`, {
        method: 'DELETE',
    })
        .catch(convertNetworkError)
        .then((checkResponse))
}