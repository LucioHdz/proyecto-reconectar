/*Cors para conexiones desde distintas ips y no solo desde el servidor */
const cors = require('cors');


/*modulo para conectarse a mysql */
const mysql = require('mysql');


/*modulo para poder crear el servidor */
const express = require('express');


/*Creacion del servidor, para poder configurarlo se usa la constante app */
const app = express();


/*middlewares */
app.use(express.json());
app.use(cors());


/*Definiendo el puerto del servidor http://localhost:3001 */
app.listen(3001,()=>console.log('servidor corriendo'));


/*Creando las configuraciones para conectarse a mysql */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'market_db'
});


/*Conectando a la base da datos, si no se conecta lanza un error */
connection.connect((err,con)=>{
    if (err) throw err;
    console.log('conectado a la base de datos');
});




/*******************************************************
 *          Operaciones para consultas mysql           *
*******************************************************/


const SQL_OBTENER_QUERY = 'SELECT * FROM categoria';
const SQL_AGREGAR_QUERY = "INSERT categoria(descripcion_categoria,status_categoria) VALUES (?, '1')";
const SQL_ELIMINAR_QUERY = 'DELETE FROM categoria WHERE idCategoria = ?';


function obtenerCategoria (callback){
    connection.query(SQL_OBTENER_QUERY,(err,res)=>{
        if (err) throw err;
        callback(res);
    }) 
}


function agregarCategoria (nombre,callback){
    var querySQL = mysql.format(SQL_AGREGAR_QUERY,[nombre]);
    connection.query(querySQL,(err,res)=>{
        if (err) throw err;
        callback(res);
    }) 
}


/*Creando rutas para hacer peticiones a el servidor */
/*obtener datos de la tabla
    http://localhost:3001/categoria */

app.get('/categoria',(req,res)=>{
    obtenerCategoria((response)=>{
        res.json(response);
    });
});



/*Agregar datos a la tabla
    http://localhost:3001/categoria */
app.post('/categoria',(req,res)=>{
    var {descripcion_categoria} = req.body
    agregarCategoria(descripcion_categoria,(response)=>{
        res.json(response);
    });
});

