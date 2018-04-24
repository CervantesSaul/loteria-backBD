const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});

let userModel = {};

userModel.getPartida = (id,callback) => {
    if (connection) {
      connection.query('SELECT * from partida WHERE idPartida='+ connection.escape(id),
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

userModel.getPartidas = (callback) => {
    if (connection) {
      connection.query('SELECT * FROM partida ORDER BY idPartida',
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

  userModel.contarPartidas = (callback) => {
    if (connection) {
      connection.query('SELECT idPartida FROM partida order by idPartida DESC LIMIT 1',
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

userModel.insertPartida = (  userData, callback) => {
    try {
      if (connection) {
        connection.query('INSERT INTO partida SET ?', userData,
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

  userModel.updatePartida = (userData, callback) => {
    if (connection) {
      const sql = `
        UPDATE partida SET
  
        idSala = ${connection.escape(userData.idSala)},
        numJugadores = ${connection.escape(userData.numJugadores)},
        costoCarta = ${connection.escape(userData.costoCarta)},
        horaInicio = ${connection.escape(userData.horaInicio)},
        horaFin = ${connection.escape(userData.horaFin)},
        estado = ${connection.escape(userData.estado)}
       
        WHERE idPartida = ${userData.idPartida}`;
  
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