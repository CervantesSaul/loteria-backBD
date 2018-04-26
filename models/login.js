const mysql = require('mysql');


var db;
let userModel = {};
function createConnection(){
    db = mysql.createConnection({
        host: 'sql165.main-hosting.eu',
        user: 'u541737295_azu',
        password: '12345678',
        database: 'u541737295_lote',
        port: 3306
      });
}

function conectar(){
  db.connect(function(error){
    if(error){
      console.log(error);
    }else{
      console.log('Conexion correcta.');
    }
  });
}

userModel.getUsuario = (callback) => {
    createConnection();
    conectar();
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
    db.end();
};
userModel.insertUser = (userData, callback) => {
    createConnection();
    conectar()
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
        db.end();
    };

    module.exports = userModel;