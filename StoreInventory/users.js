const users = {};

function addUser(userName){
    const oldId = userExists(userName);
    const uId = oldId || Math.floor(Math.random() * 10000);
    users[uId] = {uId, name : userName};
    return uId;
}

function deleteUser(uId){
    delete users[uId];
}

function userExists(userName){
    const record = Object.values(users).find(user => user.userName === userName);    
    return record && record.uId;
}

function getUser(uId){
    const record = Object.values(users).find(user => user.uId === uId);
    return record && record.uId;
}

const userDetails = {
    addUser,
    deleteUser,
    userExists,
    getUser,
}

module.exports = userDetails;