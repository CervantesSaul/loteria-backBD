const mysql = require('mysql');
db = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});



let userModel = {};

userModel.createConnection = (callback) => {
    db = mysql.createConnection({
        host: 'sql165.main-hosting.eu',
        user: 'u541737295_azu',
        password: '12345678',
        database: 'u541737295_lote',
        port: 3306
      });
  }
  
userModel.conectar = (callback) => {
    db.connect(function(error){
      if(error){
        console.log(error);
      }else{
        console.log('Conexion correcta.');
      }
    });
  }

userModel.getUsuario = (callback) => {
    if (db) {
        db.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callback(null, rows);
            }
        });
    }
};
userModel.insertUser = (userData, callback) => {
    
        if (db) {
            db.query('INSERT INTO usuario SET ?', userData,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        callback(null, result);
                    }
                }
            )
        }
    };

    module.exports = userModel;