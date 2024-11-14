const {Strategy} = require('passport-local');
const AuthService= require('./../../../services/auth');
const  boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new AuthService({
  usernameField:'email',
  passwordField:'password'
});


const LocalStrategy = new  Strategy(async (email,password,done)=>{
  try {
    const user = await service.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error,false)
  }
});
module.exports= LocalStrategy
