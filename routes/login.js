const user = require('../models/login');

module.exports = function (server) {

    //Rutas
    //Leer
    
    server.get('/usuario', (req, res) => {
        user.getUsuario((err, data) => {
            res.json(data);
        });
    });

  
  
  
    
    //Insertar
    server.post('/usuario', (req, res) => {
        console.log(req.body);
        const userData = {
            correo_electronico: req.body.correo_electronico,
            contraseña: req.body.contraseña,
            ROL: req.body.ROL,
    
          
        }

        user.insertUser(userData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Usuario Insertado',
                    data: data
                });
            }
            else {
                res.json({
                    success: false,
                    msg: 'Error de inserción'
                })
            }
        });
    });

    server.post('/usuario/login', (req, res) => {
                var userName= req.body.userName;
        var contraseña = req.body.contrasena;
        user.createConnection();
        user.conectar()
        db.query('SELECT * FROM usuario WHERE userName = ?',[userName], function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed": error
          })
        }else{
           
          if(results.length >0){
           
            if(results[0].contraseña == contraseña){
                
              res.status(200).send({
                usuario : results[0]
                  });
            }
            else{
               
               
                res.status(400).send({
                    message: "El userName y la contraseña no coinciden"
                      });
            }
          }
          else{
            res.status(400).send({
                message: "El correo no existe"
                
                  });
          }
        }
        });
        db.end();
    })

}