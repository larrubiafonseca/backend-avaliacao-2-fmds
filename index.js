import express from "express";
import cors from "cors";
import eventosRotas from "./routes/eventosRotas.js";
import convidadosRotas from "./routes/convidadosRotas.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use('/eventos', eventosRotas);
app.use('/convidados', convidadosRotas);

app.listen(5000, () => {console.log("Server is running on port 5000")});