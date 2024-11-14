const bcrypt = require('bcrypt');
async function  verifyPassword() {
  const  myPassword = 'admin 1234 .202';
  hash= '$2b$10$W/VjeeNtT176RhH0PA7n3OfFL7lgSn9CpRNpnJYX/CCdGPMtvIXLq'
  const isMatch = await  bcrypt.compare(myPassword,hash);
  console.log(isMatch)
}

verifyPassword();
