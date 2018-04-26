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




userModel.getCartaUsuario = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from cartausuario WHERE idUsuario='+ connection.escape(id),
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

  userModel.getCartaPartida = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from cartausuario WHERE idPartida='+ connection.escape(id),
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

  userModel.getCartaCarta = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from cartausuario WHERE idCarta='+ connection.escape(id),
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

userModel.getcartaUsuarios = (callback) => {
  createConnection();
  conectar();
    if (connection) {
      connection.query('SELECT * FROM cartausuario ORDER BY idPartida',
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

  userModel.contarCartaUsuario = (callback) => {
    createConnection();
    conectar();
      if (connection) {
        connection.query('SELECT count(idUsuario) as Usuarios FROM cartausuario',
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

userModel.insertCartaUsuario = (  userData, callback) => {

    try {
      createConnection();
      conectar();

      if (connection) {
        connection.query('INSERT INTO cartausuario SET ?', userData,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              callback(null, {'insertId': result.insertId})
            }
          }
        )
      }
      connection.end();
    
    } catch (error) {
      
    }
  };

  userModel.updateCartaUsuario = (userData, callback) => {
    createConnection();
    conectar();
    if (connection) {
      const sql = `
        UPDATE cartausuario SET
  
        idCarta = ${connection.escape(userData.idCarta)}
       
        WHERE idUsuario = ${userData.idUsuario} AND idPartida = ${connection.escape(userData.idPartida)}`;
  
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          callback(null, {
            "msg": "success"
          })
        }
      });
    }
    connection.end();
  };

  module.exports = userModel;