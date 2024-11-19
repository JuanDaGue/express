const { boom } = require("@hapi/boom");
const  {config} = require('./../config/config');
const { ne } = require("@faker-js/faker");

function checkApiKey (req, res, next){
  const apikey= req.headers['api'];
  if(apikey===config.apiKey){
    next()
  }
  else{
    next(boom.unauthorised());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if(user.role==='admin'){
    next()
  }else{
    next(boom.unauthorised())
  }
}

function checkRoles(...roles) {
  return(req, res, next)=>{
    const user = req.user;
    if (!user) { return next(boom.unauthorized('User not authenticated'));}
    console.log(roles)
    if(roles.includes(user.role)){
      next()
    }else{
      next(boom.unauthorised('User does not have the required role'))
    }
  }
}
module.exports = {checkApiKey, checkAdminRole, checkRoles}
