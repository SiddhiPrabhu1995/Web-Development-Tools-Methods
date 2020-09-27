const couponList = require('./couponList');
const { v4: uuidv4 } = require('uuid');

const coupons = couponList;

/*Returns all coupons details from coupon inventory*/
const readAllCoupons = () => {
    return coupons;
};

/*Generates new coupon id using uuid and adds coupon details for that particular id*/
const addCoupon = (couponDetails) => {
    const couponId = uuidv4();
    coupons[couponId] = { ...couponDetails, couponId };
    return coupons[couponId];
};

const removeCoupon = (couponId) => {
    if (!coupons[couponId]) {
        return;
    }
    let coupon = coupons[couponId];
    delete coupons[couponId];
    return coupon;
};

const updateCoupon = (couponId, couponDetails) => {

    if (!coupons[couponId]) {
        return;
    }
    coupons[couponId] = { ...couponDetails, couponId };
    return coupons[couponId];
};

module.exports = {
    readAllCoupons,
    addCoupon,
    removeCoupon,
    updateCoupon,
}