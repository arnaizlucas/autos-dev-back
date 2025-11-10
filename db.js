import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "autos_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

export default connection;
