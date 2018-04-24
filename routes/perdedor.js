const UserModel = require('../models/perdedores');

module.exports = app => {

  app.get('/perdedores/:idUsuario', (req, res) => {
    var idUsuario = req.params.idUsuario;
    UserModel.getPerdedor(idUsuario,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/perdedores', (req, res) => {
    UserModel.gePerdedores((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/perdedores/contar', (req, res) => {
    UserModel.contarPerdedores((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/perdedores', (req, res) => {
    var userData = {
      idUsuario: req.body.idUsuario,
      idPartida: req.body.idPartida
    };
   
    UserModel.insertPerdedor(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new perdedor",
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

  //no sirve el actualizar en esta tabla ya que solo hay dos campos y son primarykey
  app.put('/perdedores/:idUsuario', (req, res) => {
    const userData = {
      idUsuario: req.params.idUsuario,
        
      userName: req.body.userName,
      correo: req.body.correo
   
    };
    UserModel.updatePerdedor(userData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

}