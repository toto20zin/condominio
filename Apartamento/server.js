const express = require("express");
const app = express();

app.use(express.json());


// Importando rotas
const apartamentoRoutes = require("./src/routes/apartamento.routes");
const areaRoutes = require("./src/routes/area.routes");
const moradorRoutes = require("./src/routes/morador.routes");
const reservaRoutes = require("./src/routes/reserva.routes");

// Middleware para JSON
app.use(express.json());

// Usando rotas
app.use(apartamentoRoutes);
app.use(areaRoutes);
app.use(moradorRoutes);
app.use(reservaRoutes);

// Início do servidor
app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});