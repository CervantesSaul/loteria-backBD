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

userModel.getPerdedor = (id,callback) => {
  createConnection();
  conectar();
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
    connection.end();
  };

userModel.getPerdedores = (callback) => {
  createConnection();
  conectar();
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
    connection.end();
  };

  userModel.contarUsuarios = (callback) => {
    createConnection();
    conectar();
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
    connection.end();
  };

userModel.insertPerdedor = (  userData, callback) => {
    try {
      createConnection();
      conectar();
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
      
    }finally{
      connection.end();
    }
  };


  //no sirve el update en este caso ya que la tabla tiene solo dos campos y son primarykey compuesta
  userModel.updatePerdedor = (userData, callback) => {
    createConnection();
    conectar();
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
      connection.end();
    }
  };

  module.exports = userModel;