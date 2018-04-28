const UserModel = require('../models/lobby');

module.exports = app => {


  app.post('/lobby/accesar', (req, res) => {
    var idSala= req.body.idSala;
    var contra = req.body.contra;
    user.createConnection();
    user.conectar()
    db.query('SELECT * FROM sala WHERE idSala = ?',[idSala], function (error, results, fields) {
    if (error) {
      res.send({
      "code":400,
      "failed": error
      })
    }else{

    if(results.length >0){

    if(results[0].contra == contra){
        
      res.status(200).send({
        usuario : results[0]
          });
    }
    else{
      
      
        res.status(400).send({
            message: "La contraseña es incorrecta"
              });
    }
    }
    else{
    res.status(400).send({
        message: "La sala es incorrecta"
        
          });
    }
    }
    });
    db.end();
  });

  app.put('/datosPartidas/:idSala', (req, res) => {
    const userData = {
      idSala: req.params.idSala,
        
      numeroJugadores: req.body.numeroJugadores
   
    };
    UserModel.updateSalaNumJug(userData, function (err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Error'
        });
      } else {
       
        res.status(200).json({data});
      }
    });
  });


  app.get('/datosPartida/:idPartida', (req, res) => {
    var idUsuario = req.params.idUsuario;
    UserModel.getDatosPartida(idUsuario,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/datosPartidas', (req, res) => {
    UserModel.getDatosPartida((err, data) => {
      res.status(200).json(data);
    });
  });



}