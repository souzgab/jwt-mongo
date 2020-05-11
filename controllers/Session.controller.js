var UserSchema = require('../models/Users')
const gnt = require('../validators/generateToken');
var single = require(`@helvetia/random-names`);
const bcrypt = require('bcryptjs')

module.exports = {
    async createLogin (req, res) {
        const user = req.body;
        const usernameRandom = single.single();
    
        try {
            const create = await UserSchema.create({
                ip: "user.ip",
                login: user.login,
                password: user.password,
                username: usernameRandom
            });


            return res.status(200).json({message: `success register`, body: create, token: gnt.generateJwt({id : create.id})});
        } catch (e) {
            return res.status(400).json({message: `error register`, error: e})
        }
    },

    async logon (req, res) {
        const user = req.body;
        try {
            const find = await UserSchema.findOne({
                login: user.login,
                // password: user.password,
            });
            console.log(find.password);

            if(!await bcrypt.compare(user.password, find.password)){
            res.status(200).json({message: `error logon`, error: 'Cannot found logon'})
            }
            find === null ?
             res.status(200).json({message: `error logon`, error: 'Cannot found logon'}) :
             res.status(200).json({message: `success logon`, body: find, token: gnt.generateJwt({id : find.id})});
        } catch (e) {
            return res.status(400).json({message: `error login`, error: e})
        }
    }
}