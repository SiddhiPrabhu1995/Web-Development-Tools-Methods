import React from 'react';

/*Creating Coupon Context where the default value is overriden by provider value in CouponState*/
const CouponContext = React.createContext({
    default: 'Overriden by provider value'
});

export default CouponContext;