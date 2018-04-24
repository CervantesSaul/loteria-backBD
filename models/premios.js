const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});

let userModel = {};

userModel.getPremio = (id,callback) => {
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
    }
  };

userModel.getPremios = (callback) => {
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
    }
  };

  userModel.contarPremios = (callback) => {
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
    }
  };

userModel.insertPremio = (  userData, callback) => {
    try {
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
    
    } catch (error) {
      
    }
  };

  userModel.updatePremio = (userData, callback) => {
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
    }
  };

  module.exports = userModel;