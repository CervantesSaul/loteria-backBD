const UserModel = require('../models/users');

module.exports = app => {

  app.get('/usuarios/:idUsuario', (req, res) => {
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

  app.get('/usuariosContar', (req, res) => {
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
      if (err) {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
        // res.redirect('/users/' + data.insertId);
      } else {
        
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
      }
    } catch (error) {
      
    }
     
    });
  });

  app.put('/usuarios/:idUsuario', (req, res) => {
    const userData = {
      idUsuario: req.params.idUsuario,
        
      userName: req.body.userName,
      correo: req.body.correo,
      contraseña:req.body.contrasena,
      genero:req.body.genero,
      fechaNacimiento: req.body.fechaNacimiento,
      estado: req.body.estado
   
    };
    UserModel.updateUsuario(userData, function (err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      } else {
       
        res.status(200).json({data});
      }
    });
  });

}