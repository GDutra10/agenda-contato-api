const express = require('express');
const bodyParser = require('body-parser');
const logMiddleware = require('./middlewares/logMiddleware');
const routes = require('./routes/index')
const config = require('./config');
const app = express();

// configuração 
app.use(bodyParser.json());
app.use(logMiddleware.logRequisition);
// Rotas
app.use('/api/', routes);

// start server
app.listen(config.port, () => { 
    console.log(`--------------------------------`);
    console.log(`|Servidor rodando na porta ${config.port}|`);
    console.log(`--------------------------------`);
});