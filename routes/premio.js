const UserModel = require('../models/premios');

module.exports = app => {


  //este no funcionara (por el momento) en esta tabla por los datos que contiene
  app.get('/premios/:idPremio', (req, res) => {
    var idPremio = req.params.idPremio;
    UserModel.getUsuario(idPremio,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/premios', (req, res) => {
    UserModel.getPremios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/premios/contar', (req, res) => {
    UserModel.contarPremios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/premios', (req, res) => {
    var userData = {
      idPremio: req.body.idPremio,
      idPartida: req.body.idPartida,
      porcentaje: req.body.porcentaje
    };
   
    UserModel.insertPremio(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new Premio",
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

  app.put('/premios/:idPremio&:idPartida', (req, res) => {
    const userData = {
      idPremio: req.params.idPremio,
      idPartida: req.params.idPartida,
        
      porcentaje: req.body.porcentaje
   
    };
    UserModel.updatePremio(userData, function (err, data) {
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