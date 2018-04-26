const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'sql165.main-hosting.eu',
  user: 'u541737295_azu',
  password: '12345678',
  database: 'u541737295_lote',
  port: 3306
});

let userModel = {};

userModel.getTipoPremio = (id,callback) => {
    try{
      if (connection) {
      connection.query('SELECT * from tipopremios WHERE idPremio='+ connection.escape(id),
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

userModel.getTipoPremios = (callback) => {
    try{
      if (connection) {
      connection.query('SELECT * FROM tipopremios ORDER BY idPremio',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

  userModel.contarTipoPremios = (callback) => {
    try{
      if (connection) {
      connection.query('SELECT idPremio FROM tipopremio order by idPremio DESC LIMIT 1',
        (err, rows) => {
          if (err) {
            throw err
          }
          else {
           
            callback(null, rows);
          }
        }
      )
    }}catch(error){}
    finally{
      connection.end();
    }
  };

userModel.insertTipoPremio = (  userData, callback) => {
    try {
      if (connection) {
        connection.query('INSERT INTO tipopremio SET ?', userData,
          (err, result) => {
            if (err) {
              //throw err;
            } else {
              callback(null, {'insertId': result.insertId})
            }
          }
        )
      }
    
    }catch(error){}
    finally{
      connection.end();
    }
  };

  userModel.updateTipoPremio = (userData, callback) => {
    try{
      if (connection) {
      const sql = `
        UPDATE tipopremio SET
  
        descripcion = ${connection.escape(userData.descripcion)}
       
        WHERE idPremio = ${userData.idPremio}`;
  
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          callback(null, {
            "msg": "success"
          })
        }
      });
    }}catch(error){}
    finally{
      connection.end();
    }
  };

  module.exports = userModel;