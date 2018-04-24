const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});

let userModel = {};

userModel.getUsuario = (id,callback) => {
    if (connection) {
      connection.query('SELECT * from usuario WHERE idUsuario='+ connection.escape(id),
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }
  };

userModel.getUsuarios = (callback) => {
    if (connection) {
      connection.query('SELECT * FROM usuario ORDER BY idUsuario',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }
  };

  userModel.contarUsuarios = (callback) => {
    if (connection) {
      connection.query('SELECT count(idUsuario) FROM usuario',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }
  };

userModel.insertUser = (  userData, callback) => {
    try {
      if (connection) {
        connection.query('INSERT INTO usuario SET ?', userData,
          (err, result) => {
            if (err) {
              //throw err;
            } else {
              callback(null, {'insertId': result.insertId})
            }
          }
        )
      }
    
    } catch (error) {
      
    }
  };

  module.exports = userModel;