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

userModel.getSala = (id,callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT * from sala WHERE idSala='+ connection.escape(id),
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

userModel.getSalas = (callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT * FROM sala ORDER BY idSala',
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

  userModel.contarSalas = (callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      connection.query('SELECT Count(idSala) as Max FROM sala order by idSala DESC LIMIT 1',
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

userModel.insertSala = (  userData, callback) => {
    try {
      createConnection();
      conectar();
      if (connection) {
        connection.query('INSERT INTO sala SET ?', userData,
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

  userModel.updateSala = (userData, callback) => {
    try{
      createConnection();
      conectar();
      if (connection) {
      const sql = `
        UPDATE sala SET
  
        nombreSala = ${connection.escape(userData.nombreSala)},
        modo = ${connection.escape(userData.modo)},
        contra = ${connection.escape(userData.contra)},
        numeroJugadores = ${connection.escape(userData.numeroJugadores)},
        estado = ${connection.escape(userData.estado)}
       
        WHERE idSala = ${userData.idSala}`;
  
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