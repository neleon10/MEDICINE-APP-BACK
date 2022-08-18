
const {checking}= require('../Controllers/helpers')
const express = require("express");
const {
  User,
  Professional,
  Medicalrecord,
  Comments,
  Appointment,
  Ad,
} = require("../db");


const createAppointments=async(req, res, next)=>{
    try {
        const {hours, dates, professionalMedicalLicense, ad}= req.body
        
        const appointments = await checking(dates,hours,professionalMedicalLicense)
        console.log('soy el ad', ad)
        //console.log('llegue aca', appointments)
       if(appointments.availableApp.length> 0){
       // console.log('llegue')
            let apps = appointments.availableApp.map((app)=>{
                return{
                startTime:[app.start[3] , app.start[4]],
                endTime: [app.end[3] , app.end[4]],
                date: [app.start[0] , app.start[1] ,app.start[2]],
                status: 'available',
                professionalMedicalLicense: professionalMedicalLicense,
                adId: ad 
                }
            })
       
               await Appointment.bulkCreate(apps);  
    
               res.status(200).send(appointments); 
       }
        else{
         res.status(418).send({ message: 'these were not created' });
        } 
      
        
    } catch (error) {
        next (error)
    }
        
}

const getAppointments = async(req,res,next)=>{
    try{
        let app = await Appointment.findAll()

        res.send(app)


    }catch(e){
        next(e)
    }
}


const getAppointmentsByProfessional = async(req,res,next)=>{
    const { professionalMedicalLicense} = req.params;
    console.log('llegue')
    try{
        
        let app = await Appointment.findAll({
            where:{
                professionalMedicalLicense: professionalMedicalLicense,
            }
    })
        res.send(app)
    }catch(e){
        next(e)
    }
}

const getAppointmentsByAdAvailable = async(req,res,next)=>{
    let {adId} = req.params
    try{
        let app = await Appointment.findAll({
            where:{
                adId:adId,
                status:'available'
            }
    })

    res.send(app)
    }catch(e){
        next(e)
    }
}


const getAppointmentsByUser = async(req,res,next)=>{
    let {userEmail} = req.params
    try{
        let app = await Appointment.findAll({
            where:{
                userEmail:userEmail,
            }
    })
        res.send(app)
    }catch(e){
        next(e)
        res.send("El usuario no cuenta con turnos")
    }
}

const getAppointmentById = async (req,res,next) => {
    let {id} = req.params
    try{
        const appoinment = await Appointment.findByPk(id, { include: Ad });
        if (!appoinment)
          return res.status(404).send("there's no professionals here! ");
        else res.status(200).send(appoinment);
    }catch(err){
        next(err)
    }
}

const editAppointments = async (req, res, next) => {
    try {
      let { userEmail, status, medicalRecord, rating } = req.body;
      let { AppId} = req.params;
 
        //selected appointments
      if(userEmail && status==='booked' && !medicalRecord && !rating){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: status });
        res.status(200).send("se ha modificado el status a booked");
      }
 
      //Appointment paid out

      if(userEmail && status==='pending' && !medicalRecord && !rating){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ userEmail:userEmail, status: status });
        res.status(200).send("el turno ha sido pagado");
      }
      //Appointment paid cancell
      if(userEmail && status==='available' && !medicalRecord && !rating){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: status });
        res.status(200).send("el turno esta disponible");
      }
      //Appointment completed
      if(!status && medicalRecord && !rating){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: 'completed', medicalRecord: medicalRecord});
        res.status(200).send("se ha modificado el status a completado");
        //entra useEffect cdo usuario entra a su perfil, que va a tener un condicional que si el status de su turnos es completed y rating===null dispara un modal para calificar ese turno
      }
      //user complet rating
      if(userEmail && !status && !medicalRecord && rating){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ rating: rating });
        res.status(200).send("se ha modificado el raiting");
      }
      // user absent
      if(status=== 'absent'){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: status });
        res.status(200).send("se ha modificado el status a ausente");
      }
      
      if(userEmail && status=== 'cancelled'){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: status });
        res.status(200).send("el usuario ha cancelado el turno");
      }
      if(status=== 'cancelled'){
        const app = await Appointment.findByPk(AppId);
        await app?.update({ status: status });
        res.status(200).send("el usuario ha cancelado el turno");
      }
      
      
    } catch (e) {
      next(e)
  };
  }

  const createCancellAppointmentsByUser=async(req, res, next)=>{
    try {
        const {hours, dates, professionalMedicalLicense, ad}= req.body
        const {idApp}=req.params
        const appointments = await findByPk(idApp)
       
            let apps ={ 
              
                startTime:appointments.startTime,
                endTime: appointments.endTime ,
                date: appointments.date,
                status: 'available',
                professionalMedicalLicense: professionalMedicalLicense,
                adId: ad 
      
                }
               await Appointment.Create(apps);  
    
               res.status(200).send(appointments); 
       
         res.status(418).send({ message: 'these were not created' });
       
    } catch (error) {
        next (error)
    }
        
}

const deleteAppointment = async(req,res,next)=>{
	let {id} = req.params
    console.log(id)
	try {
		await Appointment.destroy({where:{id}})
		res.send('appointment deleted')		
	} catch (error) {
		next(error)
	}
}


module.exports={createAppointments, getAppointments, getAppointmentsByProfessional,
    getAppointmentsByAdAvailable, getAppointmentsByUser,editAppointments,
      createCancellAppointmentsByUser,getAppointmentById, deleteAppointment }