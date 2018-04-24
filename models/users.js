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
      connection.query('SELECT idUsuario FROM usuario order by idUsuario DESC LIMIT 1',
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

  userModel.updateUsuario = (userData, callback) => {
    if (connection) {
      const sql = `
        UPDATE usuario SET
  
        userName = ${connection.escape(userData.userName)},
        correo = ${connection.escape(userData.correo)},
        genero = ${connection.escape(userData.genero)},
        fechaNacimiento = ${connection.escape(userData.fechaNacimiento)},
        estado = ${connection.escape(userData.estado)},
        contraseña = ${connection.escape(userData.contraseña)}
       
        WHERE idUsuario = ${userData.idUsuario}`;
  
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
  };

  module.exports = userModel;