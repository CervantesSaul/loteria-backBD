const UserModel = require('../models/partidas');

module.exports = app => {

  app.get('/partidas/:idPartida', (req, res) => {
    var idPartida = req.params.idPartida;
    UserModel.getPartida(idPartida,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/partidas', (req, res) => {
    UserModel.getPartidas((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/partidas/contar', (req, res) => {
    UserModel.contarPartidas((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/partidas', (req, res) => {
    var userData = {
      idPartida: req.body.idPartida,
      idSala: req.body.idSala,
      numJugadores: req.body.numJugadores,
      costoCarta:req.body.costoCarta,
      horaInicio:req.body.horaInicio,
      horaFin: req.body.horaFin,
      estado: req.body.estado
    };
   
    UserModel.insertPartidas(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new partida",
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

  app.put('/partidas/:idPartida', (req, res) => {
    const userData = {
      idPartida: req.params.idPartida,
        
      idSala: req.body.idSala,
      numJugadores: req.body.numJugadores,
      costoCarta:req.body.costoCarta,
      horaInicio:req.body.horaInicio,
      horaFin: req.body.horaFin,
      estado: req.body.estado
   
    };
    UserModel.updateUsuario(userData, function (err, data) {
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