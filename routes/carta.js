const UserModel = require('../models/carta');

module.exports = app => {



  app.get('/carta', (req, res) => {
    UserModel.getCarta((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/carta/:idcarta', (req, res) => {
    var idcarta = req.params.idcarta;
    UserModel.getCartaId(idcarta,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });
  

}