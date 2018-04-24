const UserModel = require('../models/users');

module.exports = app => {

  app.get('/usuarios/:id', (req, res) => {
    var idUsuario = req.params.idUsuario;
    UserModel.getUsuario(idUsuario,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/usuarios', (req, res) => {
    UserModel.getUsuarios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/usuarios/contar', (req, res) => {
    UserModel.contarUsuarios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/usuarios', (req, res) => {
    var userData = {
      idUsuario: req.body.idUsuario,
      userName: req.body.userName,
      correo: req.body.correo,
      contraseña:req.body.contrasena,
      genero:req.body.genero,
      fechaNacimiento: req.body.fechaNacimiento,
      estado: req.body.estado
    };
   
    UserModel.insertUser(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/users/' + data.insertId);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    } catch (error) {
      
    }
     
    });
  });

}