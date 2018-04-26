const UserModel = require('../models/users');

module.exports = app => {

  app.get('/cartausuario/:idUsuario', (req, res) => {
    var idUsuario = req.params.idUsuario;
    UserModel.getCartaUsuario(idUsuario,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/cartapartida/:idPartida', (req, res) => {
    var idPartida = req.params.idPartida;
    UserModel.getCartaUsuario(idPartida,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/cartacarta/:idCarta', (req, res) => {
    var idCarta = req.params.idCarta;
    UserModel.getCartaUsuario(idCarta,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/cartapartida', (req, res) => {
    UserModel.getCartaUsuarios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/cartaContar', (req, res) => {
    UserModel.contarCartaUsuario((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/cartausuario', (req, res) => {
    var userData = {
      idUsuario: req.body.idUsuario,
      idPartida: req.body.idPartida,
      idCarta: req.body.idCarta
    };
   
    UserModel.insertCartaUsuario(userData, (err, data) => {
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
          msg: "Inserted a new registro de carta usada",
          data: data
        });
      }
    } catch (error) {
      
    }
     
    });
  });

  app.put('/cartausuario', (req, res) => {
    const userData = {
      idUsuario: req.body.idUsuario,
        
      idPartida: req.body.idPartida,
      idCarta: req.body.idCarta
      
   
    };
    UserModel.updateCartaUsuario(userData, function (err, data) {
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