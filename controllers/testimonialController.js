import{Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial= async(req,res)=>{
    //Validacion 
    const errores=[]
    const {nombre,correo,mensaje}=req.body
    if(nombre.trim()===''){
        errores.push({mensaje:'El nombre esta Vacio'})
    }

    if(correo.trim()===''){
        errores.push({mensaje:'El correo esta Vacio'})
    }
  
    if(mensaje.trim()===''){
       errores.push({mensaje:'El mensaje esta Vacio'})
    }
    if(errores.length>0){
        //consulta testimoniales creados 
        const testimoniales=await Testimonial.findAll()

        //mostrar la vista con errores 
        res.render('testimoniales',{pagina:'Testimoniales',errores,nombre,correo,mensaje,testimoniales})
    }else{
            //almacenar en base de datos
        try{
            await Testimonial.create({
                nombre,correo,mensaje
            })
            res.redirect('/testimoniales')
        }catch(error){
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}