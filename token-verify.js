const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczMTM4NjMwMn0.X7AmUhVvx2AQdYeLP-SVaHhIsUDXfauARChlp82Y2ps'
const secret= config.jwtSecret;
function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}
const payload = verifyToken(token, secret)
console.log(payload)
