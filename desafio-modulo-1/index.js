const express = require('express')

const server = express();

server.use(express.json());

const projects = [];

function checkoutId(request, response, next){

    const { id } = request.params;
    
    const project = projects.find(pro => pro.id == id);
    
    if(!project){
        return response.status(404).json({error: 'Id inválido'})
    }
    next();
}

/* function logRequests(req, res, next) {

    console.count("Número de requisições");
  
    return next();
  }
  
  server.use(logRequests); */

  function logRequests(req, res, next) {

    console.count("Número de requisições");
  
    return next();
  }

  /*Fazendo isso, significa que todas as rotas utilizam essa Middleware */
  /* Middleware global */
  server.use(logRequests);

/* Cria um projeto */
server.post('/project/',(require, response) => {
    const { id, title } = require.body;

    const project = {
        id,
        title,
        tasks:[],
    };

    projects.push(project)

    return response.json(project);

})

/* Listar todos os projetos */
server.get('/project',(request, response) => {
    return response.json(projects);
})

/* Alterar o nome de algum projeto */
server.put('/project/:id',checkoutId,(request, response) =>{

    const { id } = request.params;
    const { title } = request.body;

    const project = projects.find(p => p.id == id)

    project.title = title;

    return response.json(project)
})

/* Deletar algum projeto */
server.delete('/project/:id',checkoutId,(request, response) => {

    const { id } = request.params;

    projects.splice(id, 1)              //Onde começo removendo, quantos elementos eu removo

    return response.json(projects)
})

/* Criando um tarefa */
server.post('/project/:id/task',checkoutId,function (request, response){

    const { id } = request.params;
    const { title } = request.body;

    const project = projects.find( p => p.id === id)

    project.tasks.push(title)

    return response.json(project)
})


server.listen(3000);