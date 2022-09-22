import express from "express";
import { api } from "./config/config.js";
import swaggerDocs from "./config/swagger.config.js";
import cors from 'cors'

import users from './routes/user.routes.js';
import tutorados from './routes/tutorados.routes.js';
import atencion from "./routes/atencion.routes.js";
import encuesta from './routes/encuesta.routes.js';
import estudiantes from './routes/registerAlum.routes.js';

const app = express();

app.use(express.json());

app.use(cors({origin: "http://localhost:3001"}))


app.use('/api/users', users);
app.use('/api/tutorados', tutorados);
app.use("/api/atencion", atencion);
app.use("/api/encuesta", encuesta);
app.use('/api/alumnos', estudiantes)



app.listen(api.port, () => {
  console.log("server running on port=>", api.port);
  swaggerDocs(app, api.port);
});



