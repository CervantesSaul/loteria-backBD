const mysql = require('mysql');

var connection;
let userModel = {};
function createConnection(){
  connection = mysql.createConnection({
    host: 'sql165.main-hosting.eu',
    user: 'u541737295_azu',
    password: '12345678',
    database: 'u541737295_lote',
    port: 3306
  });
}

function conectar(){
  connection.connect(function(error){
    if(error){
      console.log(error);
    }else{
      console.log('Conexion correcta.');
    }
  });
}


userModel.getCartaId = (id,callback) => {
  createConnection();
  conectar();
  if (connection) {
    connection.query('SELECT * from carta WHERE idcarta='+ connection.escape(id),
      (err, rows) => {
        if (err) {
          console.log(err);
        }
        else {
         
          callback(null, rows);
        }
      }
    )
  }
  connection.end();
};



userModel.getCarta = (callback) => {
  createConnection();
  conectar();
    if (connection) {
      connection.query('SELECT * FROM carta ORDER BY idcarta',
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(rows);
            callback(null, rows);
          }
        }
      )
    }
    connection.end();
  };




  module.exports = userModel;