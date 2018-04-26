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


userModel.getGanadorU = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from ganadores WHERE idUsuario='+ connection.escape(id),
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

  userModel.getGanadorP = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from ganadores WHERE idPartida='+ connection.escape(id),
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

userModel.getGanadores = (callback) => {
  createConnection();
  conectar();
    if (connection) {
      connection.query('SELECT * FROM ganadores ORDER BY idUsuario',
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

  userModel.contarGanadores = (callback) => {
    createConnection();
    conectar();
      if (connection) {
        connection.query('SELECT count(*) as Ganadores FROM ganadores',
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

userModel.insertGanador = (  userData, callback) => {

    try {
      createConnection();
      conectar();

      if (connection) {
        connection.query('INSERT INTO ganadores SET ?', userData,
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

  userModel.updateGandor = (userData, callback) => {
    createConnection();
    conectar();
    if (connection) {
      const sql = `
        UPDATE ganadores SET
  
        idPremio = ${connection.escape(userData.idPremio)},
        idCarta = ${connection.escape(userData.idCarta)},
        idBaraja = ${connection.escape(userData.idBaraja)},
        monto = ${connection.escape(userData.monto)}
       
        WHERE idUsuario = ${userData.idUsuario} AND idPartida = ${userData.idPartida}`;
  
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