const routerApi = require('./routes')
const express = require('express');
const cors = require('cors')
const {errorHandler, logErrors, boomErrorHandler, ormErrorHandler  } = require('./middlewares/error.handler');



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
app.get('/',(req,res)=>{
  res.send('Hi, you are in my express server')
});
app.get('/new-path',(req,res)=>{
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



