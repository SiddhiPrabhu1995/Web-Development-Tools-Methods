const userCoupons = {};

const readUserCoupons = (username) => {
    if (!userCoupons[username]) {
        return {};
    }
    return userCoupons[username];
};

const addUserCoupons = (username, couponId, couponDetails) => {
    if (!username) {
        return {};
    }
    userCoupons[username] = userCoupons[username] || {};
    userCoupons[username][couponId] = { ...couponDetails, couponId };
    return userCoupons[username][couponId];
}

const removeUserCoupon = (username, couponId) => {
    if (!userCoupons[username]) {
        return;
    }
    const coupon = userCoupons[username][couponId];
    delete userCoupons[username][couponId];
    return coupon;
}

module.exports = {
    readUserCoupons,
    addUserCoupons,
    removeUserCoupon
}