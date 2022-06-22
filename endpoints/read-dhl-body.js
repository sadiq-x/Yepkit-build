import dhlbody from '../dhl-body.json' assert {type: 'json'};

import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster';

export function readDhlfileShipment(req, res) {
    const token = generateToken(req.headers)
    const verify = jwt.verify(token, privatekey)
    if (verify) {
        res.send(dhlbody)
    }
}

function generateToken(payload) {
    return jwt.sign(payload, privatekey)
}