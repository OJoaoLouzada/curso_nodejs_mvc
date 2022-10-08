// Importação dos módulos
const express = require('express')
const exphbs = require('express-handlebars')

// Invocação do módulo
const app = express()

// Conexão com o banco de dados
const conn = require('./db/conn')

// Invocação dos models
const Task = require('./models/Task')

// Importação das rotas
const tasksRoutes = require('./routes/tasksRoutes')

// Definição da template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middleware para ler o que vem no corpo da requisição
app.use(
  express.urlencoded({
    extended: true
  })
)

// Middleware para transformar os dados da requisição em json
app.use(express.json())

// Middleware para definir a pasta de acesso público e arquivos estáticos
app.use(express.static('public'))

// Middleware para acessar a pasta routes
app.use('/tasks', tasksRoutes)

// Inicialização da aplicação
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))