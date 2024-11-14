const routerApi = require('./routes')
const express = require('express');
const cors = require('cors')
const {errorHandler, logErrors, boomErrorHandler, ormErrorHandler  } = require('./middlewares/error.handler');
const {checkApiKey} = require('./middlewares/auth.handlert')
require('./utils/auth')

const app = express();
const port = 3000;

app.use(express.json());
const witelist= ['htpps://localhost:','https//myapp.co']
const options={
  origin:(origin,calback)=>{
    if(witelist.includes(origin)){
      calback(null,true)
    }
    else{
      calback(new Error('access not permitted'))
    }
  }
}
app.use(cors());
app.get('/api',(req,res)=>{
  res.send('Hi, you are in my express server')
});
app.get('/api/new-path',checkApiKey,(req,res)=>{
  res.send('helo, new path')
});

routerApi(app)
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () =>{
  console.log('Mi port ' + port)
});



