import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path"

import reservaRoutes from "./src/routes/reservaRoutes.js"
import clientsRoutes from "./src/routes/clienteRoutes.js"

const app = express()

const corsOptions = {
  origin: ['http://localhost:5173', 'https://evaluacion-20-8wz2.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./gerardo-fd2-PartPlusAPI-1.0.0-resolved.json"), "utf-8")
)


app.use(cors(corsOptions))
app.use(express.json())


app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/reservas", reservaRoutes)
app.use("/api/clientes", clientsRoutes)

export default app