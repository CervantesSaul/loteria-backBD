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

userModel.getPartida = (id,callback) => {
  createConnection();
  conectar();
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
    connection.end();
  };

userModel.getPartidas = (callback) => {
  createConnection();
  conectar();
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
    connection.end();
  };

  userModel.contarPartidas = (callback) => {
    createConnection();
    conectar();
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
    connection.end();
  };

userModel.insertPartida = (  userData, callback) => {
    try {
      createConnection();
      conectar();
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
      
    }finally{
      connection.end();
    }
  };

  userModel.updatePartida = (userData, callback) => {
    createConnection();
    conectar();
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
    connection.end();
  };

  module.exports = userModel;