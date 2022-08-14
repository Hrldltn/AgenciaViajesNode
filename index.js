import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'

const app=express()

//conectar db 
db.authenticate()
    .then(()=>console.log('base de datos conectada'))
    .catch(error=>console.log(error))

//definir puerto servidor express
const port=process.env.Port||4000

//habilitar PUG
app.set('view engine','pug')

//obtener el año actual como middleware
app.use((req,res,next)=>{
    const year=new Date()

    res.locals.ActualYear=year.getFullYear()
    res.locals.nombreSitio="Agencia de Viajes"
    return next()
})

//Agregar body parse para leer datos de formulario
app.use(express.urlencoded({extended:true}))


//definir la carpeta public
app.use(express.static('public'))

//agregar routers 
app.use('/',router)


app.listen(port,()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})