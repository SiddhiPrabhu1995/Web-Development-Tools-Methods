const convertNetworkError = (err) => {
    return {
        code: 'NETWORK-ERROR',
        err
    };
};

const checkResponse = (response) => {
    if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
    }
    return response.json();
}

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

export const fetchTheme = (username) => {
    return fetch(`/theme/${username}`, {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then(checkResponse)
};

export const fetchUpdateTheme = (username, theme) => {
    return fetch(`/theme/${username}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ theme }),
    })
        .catch(convertNetworkError)
        .then(checkResponse)
};

export const fetchAllTasks = (username) => {
    return fetch(`/tasks/${username}`, {
        method: 'GET',
    })
        .catch(convertNetworkError)
        .then(checkResponse)
}

export const fetchAddTasks = (username, task) => {
    return fetch(`/tasks/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ task })
    })
        .catch(convertNetworkError)
        .then(checkResponse)
};

export const fetchDeleteTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'DELETE'
    })
        .catch(convertNetworkError)
        .then(checkResponse)
}

export const fetchUpdateTask = (username, taskId, task) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ task })
    })
        .catch(convertNetworkError)
        .then(checkResponse)
}