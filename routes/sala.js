const UserModel = require('../models/salas');



module.exports = app => {

  app.get('/salas/:idSala', (req, res) => {
    var idSala = req.params.idSala;
    UserModel.getSala(idSala,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/getSalas', (req, res) => {
    UserModel.getSalas((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/salasContar', (req, res) => {
    UserModel.contarSalas((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/salas', (req, res) => {
    var userData = {
      idSala: req.body.idSala,
      nombreSala: req.body.nombreSala,
      modo: req.body.modo,
      contra:req.body.contra,
      numeroJugadores:req.body.numeroJugadores,
      estado: req.body.estado
    };
   
    UserModel.insertSala(userData, (err, data) => {
    try {
      if (data) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new sala",
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

  app.put('/salas/:idSala', (req, res) => {
    const userData = {
      idSala: req.params.idSala,
        
      nombreSala: req.body.nombreSala,
      modo: req.body.modo,
      contra:req.body.contra,
      numeroJugadores:req.body.numeroJugadores,
      estado: req.body.estado
   
    };
    UserModel.updateSala(userData, function (err, data) {
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