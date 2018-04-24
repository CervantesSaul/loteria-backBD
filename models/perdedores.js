const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});

let userModel = {};

userModel.getPerdedor = (id,callback) => {
    if (connection) {
      connection.query('SELECT * from perdedor WHERE idUsuario='+ connection.escape(id),
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

userModel.getPerdedores = (callback) => {
    if (connection) {
      connection.query('SELECT * FROM perdedor ORDER BY idUsuario',
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
      connection.query('SELECT count(idPerdedor) FROM perdedor order by idPerdedor DESC LIMIT 1',
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

userModel.insertPerdedor = (  userData, callback) => {
    try {
      if (connection) {
        connection.query('INSERT INTO perdedor SET ?', userData,
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


  //no sirve el update en este caso ya que la tabla tiene solo dos campos y son primarykey compuesta
  userModel.updatePerdedor = (userData, callback) => {
    if (connection) {
      const sql = `
        UPDATE perdedor SET
  
        userName = ${connection.escape(userData.userName)},
        correo = ${connection.escape(userData.correo)},
       
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