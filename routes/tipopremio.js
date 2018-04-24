const UserModel = require('../models/tipopremios');

module.exports = app => {

  app.get('/tipoPremios/:idPremio', (req, res) => {
    var idPremio = req.params.idPremio;
    UserModel.getUsuario(idPremio,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/tipoPremios', (req, res) => {
    UserModel.getUsuarios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/tipoPremios/contar', (req, res) => {
    UserModel.contarUsuarios((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/tipoPremios', (req, res) => {
    var userData = {
      idPremio: req.body.idPremio,
      descripcion: req.body.descripcion
    };
   
    UserModel.insertTipoPremio(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new tipoPremio",
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

  app.put('/tipoPremios/:idPremio', (req, res) => {
    const userData = {
      idPremio: req.params.idPremio,
        
      descripcion: req.body.descripcion
   
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