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

userModel.getPremio = (id,callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT * from premio WHERE idPremio='+ connection.escape(id),
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

userModel.getPremios = (callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT * FROM premios ORDER BY idPremio',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

  userModel.contarPremios = (callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT idPremio FROM premio order by idPremio DESC LIMIT 1',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

userModel.insertPremio = (  userData, callback) => {
    try {
      createConnection();
      conectar();
      if (connection) {
        connection.query('INSERT INTO premio SET ?', userData,
          (err, result) => {
            if (err) {
              //throw err;
            } else {
              callback(null, {'insertId': result.insertId})
            }
          }
        )
      }
    
    }catch(error){}
    finally{
      connection.end();
    }
  };

  userModel.updatePremio = (userData, callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      const sql = `
        UPDATE premio SET
  
        porcentaje = ${connection.escape(userData.porcentaje)}
       
        WHERE idPremio = ${userData.idPremio} AND idPartida = ${userData.idPartida}`;
  
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          callback(null, {
            "msg": "success"
          })
        }
      });
    }}catch(error){}
    finally{
      connection.end();
    }
  };

  module.exports = userModel;