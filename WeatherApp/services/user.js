
'use strict'

const _ = require('lodash')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

let service = {
/*     findUser: (user) => {
        return _.find(users, u => (u.username == user.username) || (u.email == user.email));
    },
    findById: (id) => {
        let result =  _.find(users, u => u.id == id);
        delete result.password;
        return result;
    },
 */ findByRol: async (rol) => {
        // return _.filter(users, u => _.includes(u.roles, rol));
        const result = await User.find({roles: rol},{_id:1 }).exec();
        return result;
    },
    randomRepairman: async function() {
        const repairmans = await this.findByRol("TECNICO");        
        return repairmans[_.random(0,repairmans.length-1)];
    }/* ,
    insertUser : (user) => {
        return users.push({
            id: users.length,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            password: user.password
        });
    } */
}

module.exports = service