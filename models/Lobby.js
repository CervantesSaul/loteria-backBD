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

userModel.getDatosPartida = (callback) => {
  createConnection();
  conectar();
  if (connection) {
    connection.query('SELECT sala.idSala, sala.nombreSala, partida.idpartida , sala.numeroJugadores, sala.contra from sala INNER JOIN partida on partida.idSala = sala.idSala where sala.numJugadores > 0',
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

userModel.updateSalaNumJug = (userData, callback) => {
  createConnection();
  conectar();
  if (connection) {
    const sql = `
      UPDATE sala SET

      numeroJugadores = ${connection.escape(userData.numeroJugadores)}
     
      WHERE idSala = ${userData.idSala}`;

    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(null, {
          "message": "success"
        })
      }
    });
  }
  connection.end();
};

userModel.updatePartidaNumJug = (userData, callback) => {
  createConnection();
  conectar();
  if (connection) {
    const sql = `
      UPDATE partida SET

      numJugadores = ${connection.escape(userData.numJugadores)}
     
      WHERE idPartida = ${userData.idPartida}`;

    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(null, {
          "message": "success"
        })
      }
    });
  }
  connection.end();
};

userModel.updatePartidaNumJug = (userData, callback) => {
  createConnection();
  conectar();
  if (connection) {
    const sql = `
      UPDATE partida SET

      numJugadores = ${connection.escape(userData.numJugadores)}
     
      WHERE idPartida = ${userData.idPartida}`;

    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(null, {
          "message": "success"
        })
      }
    });
  }
  connection.end();
};


  module.exports = userModel;