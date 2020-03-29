const express = require('express')

/* Precisa fazer isso */
const server = express();


/* server.use((request, response, next) => {
    console.time('Request');

    console.log(`Método: ${request.method}; URL: ${request.url}`)

    next();

    console.timeEnd('Request');
}) */
const users = ['anderson','diego','rocketseat']

/* server.use(function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }) */


  /* Middleware para verificar se o Id do users existe*/
  function checkoutIdUserExists(req,res,next){
      if(!users[req.params.index]){
          return res.status(400).json({error: 'User name is required'})
      }

      return next();
  }

/* Faz com que o express entenda as informações que venham no body */
server.use(express.json());       

    server.get('/teste/:index', checkoutIdUserExists ,(request, response) => {

    const { index } = request.params;

    return response.json(users[index]);
});


/* Quero que esse servidor escute a porta */
server.listen(3000)

