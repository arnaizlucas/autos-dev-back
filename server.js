import express from "express";
import cors from "cors";
import mysql from "mysql2";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());


// Ruta para obtener todos los vehículos
app.get("/api/vehiculos", (req, res) => {
  const query = "SELECT * FROM vehiculos";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener vehículos:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener todos los vendedores
app.get("/api/vendedores", (req, res) => {
  const query = "SELECT * FROM vendedores";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener vendedores:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener todas las ventas
app.get("/ventas", (req, res) => {
  const query = `
    SELECT v.id_venta, c.nombre, c.apellido, ve.marca, ve.modelo, f.metodo, v.monto_total, v.fecha_venta
    FROM ventas v
    JOIN clientes c ON v.id_cliente = c.id_cliente
    JOIN vehiculos ve ON v.id_vehiculo = ve.id_vehiculo
    JOIN formas_pago f ON v.id_pago = f.id_pago
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener ventas:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
