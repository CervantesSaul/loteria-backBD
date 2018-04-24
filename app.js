const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();

const user = require('./models/users');

app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY, Origin, X-Requested,Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,');
    res.header('Allow','GET,POST,PUT,OPTIONS,DELETE');
    next();
});

//RUTAS
require('./routes/user')(app);

//static files
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app)
  .listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });