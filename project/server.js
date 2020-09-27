const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

const session = require('./session');
const coupons = require('./coupons');
const userCoupons = require('./user-coupons');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

/*If the session is valid sends '200 OK success status' in response
If session is invalid it clears cookie and sends 401 Unauthorized 
client error status in response*/
app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }
    res.status(200).json({ data: session.getSession(sid) });
});

app.post('/session', (req, res) => {
    const username = req.body.username;
    const sessionInfo = session.attemptCreate(username);
    if (!sessionInfo) {
        res.status(403).json({ code: 'login denied' });
        return;
    }
    res.cookie('sid', sessionInfo.sid, { MaxAge: 1000 * 60 });
    res.status(200).json({ data: sessionInfo });
});

app.delete('/session', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }
    res.clearCookie('sid');
    session.remove(sid);
    res.status(200).json({ data: sid });
});

/*Gets coupon details from coupons read All function 
and sends 200 OK as a response along with coupon detail list in json object*/
app.get('/coupons', (req, res) => {
    const couponList = coupons.readAllCoupons();
    res.status(200).json({ data: couponList });
})

/*Contact us form POST method*/
app.post('/form/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }

    const formDetails = req.body.form;
    res.status(200).json({ data: form.addForm(formDetails) });

    })

//Admin Operations
app.post('/coupons/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }

    const couponDetails = req.body.coupons;
    res.status(200).json({ data: coupons.addCoupon(couponDetails) });
})

app.put('/coupons/:username/:couponId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }

    const couponId = req.params.couponId;
    const coupon = req.body.coupons;

    const newCoupon = coupons.updateCoupon(couponId, coupon);
    if (!newCoupon) {
        res.status(400).json({ code: 'failed to update' });
        return;
    }
    res.status(200).json({ data: coupon });
})

app.delete('/coupons/:couponId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const couponId = req.params.couponId;
    const coupon = coupons.removeCoupon(couponId);
    if (!coupon) {
        res.status(404).json({ code: 'no such couponId' });
        return;
    }
    res.status(200).json({ data: coupon });
})


//Customer Operations
app.get('/coupons/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }

    const couponList = userCoupons.readUserCoupons(username);
    res.status(200).json({ data: couponList });
})

app.post('/coupons/:username/:couponId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }
    const couponId = req.params.couponId;
    if (!couponId) {
        res.status(404).json({ code: 'no such couponId' });
        return;
    }
    const couponDetails = req.body.coupons;
    const favCoupon = userCoupons.addUserCoupons(username, couponId, couponDetails);
    res.status(200).json({ data: favCoupon });
})

app.delete('/coupons/:username/:couponId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if (!validSession) {
        res.clearCookie('sid');
        res.status(401).json({ code: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if (!isAllowed) {
        res.status(403).json({ code: 'action not permitted' });
        return;
    }

    const couponId = req.params.couponId;

    const coupon = userCoupons.removeUserCoupon(username, couponId);
    if (!coupon) {
        res.status(404).json({ code: 'no such couponId' });
        return;
    }

    res.status(200).json({ data: coupon });
})


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));