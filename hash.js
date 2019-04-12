const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// bcrypt.genSalt(10, (err, salt)=>{
//     if(err) return next(err);

//     bcrypt.hash('password123', salt, (err, hash)=>{
//         if(err) return next(err);
//         console.log(hash)
//     })
// })


// const secrete = 'qqqq';

// const secreteSalt = ''

// const user = {
//     id: 1,
//     token: MD5('123123').toString()
// }

// console.log(user)

const id = '1000'
const secret = 'secret'

const receiveToken = 'eyJhbGciOiJIUzI11NiJ9.MTAwMA.Mtqla2KOCm6LNox8cmKkLWsyMXi_6DHa8LuNzY8O2Wc'

const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(receiveToken, secret);

console.log(decodeToken)
