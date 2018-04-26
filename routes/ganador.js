const UserModel = require('../models/ganadores');

module.exports = app => {

  app.get('/ganador/:idUsuario', (req, res) => {
    var idUsuario = req.params.idUsuario;
    UserModel.getGanadorU(idUsuario,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/ganadorP/:idPartida', (req, res) => {
    var idPartida = req.params.idPartida;
    UserModel.getGanadorP(idPartida,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/ganadores', (req, res) => {
    UserModel.getGanadores((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/ganadoresContar', (req, res) => {
    UserModel.contarGanadores((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/ganadores', (req, res) => {
    var userData = {
      idUsuario: req.body.idUsuario,
      idPartida: req.body.idPartida,
      idPremio: req.body.idPremio,
      idCarta:req.body.idCarta,
      idBaraja:req.body.idBaraja,
      monto: req.body.monto
    };
   
    UserModel.insertGanador(userData, (err, data) => {
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

  app.put('/ganadores/:idUsuario', (req, res) => {
    const userData = {
      idUsuario: req.params.idUsuario,
        
      idPartida: req.body.idPartida,
      idPremio: req.body.idPremio,
      idCarta:req.body.idCarta,
      idBaraja:req.body.idBaraja,
      monto: req.body.monto
   
    };
    UserModel.updateGanador(userData, function (err, data) {
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