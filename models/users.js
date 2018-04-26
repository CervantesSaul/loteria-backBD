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

userModel.getUsuarios2 = (callback) => {
  createConnection();
  conectar();
  if (connection) {
    connection.query('SELECT * FROM usuario ORDER BY idUsuario',
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




userModel.getUsuario = (id,callback) => {
    createConnection();
    conectar();
    if (connection) {
      connection.query('SELECT * from usuario WHERE idUsuario='+ connection.escape(id),
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

userModel.getUsuarios = (callback) => {
  createConnection();
  conectar();
    if (connection) {
      connection.query('SELECT * FROM usuario ORDER BY idUsuario',
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

  userModel.contarUsuarios = (callback) => {
    createConnection();
    conectar();
      if (connection) {
        connection.query('SELECT count(idUsuario) as Usuarios FROM usuario order by idUsuario DESC LIMIT 1',
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

userModel.insertUser = (  userData, callback) => {

    try {
      createConnection();
      conectar();

      if (connection) {
        connection.query('INSERT INTO usuario SET ?', userData,
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

  userModel.updateUsuario = (userData, callback) => {
    createConnection();
    conectar();
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
    connection.end();
  };

  module.exports = userModel;