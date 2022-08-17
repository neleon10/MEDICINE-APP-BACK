const { Router } = require('express');
//const {Ad, Professional, User} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const {routefilter} = require('../Controllers/controllerFilters_copy')


const {createAppointments, getAppointments, getAppointmentsByProfessional, getAppointmentsByAd, editAppointments, createCancellAppointmentsByUser ,getAppointmentById, getAppointmentsByAdAvailable, getAppointmentsByUser} = require('../Controllers/controllerAppointments')

const { PaymentRoute } = require('../Controllers/controllerStripePay')
const  { getAllUsers,getPro,getDbAd,createUser,createProfessional,createAds, getProfessionalById, userId, getAdById, addFavorites, removeFavorites, editProfessional, editUser, editAd,deleteUserById,recoverBymail }  = require ('../Controllers/getPostControllers')






const router = Router();


//get users
router.get('/users', getAllUsers)

// get user by id
router.get('/user/:id', userId)

//get all professionals
router.get('/professionals', getPro)

router.get("/professionals/:id", getProfessionalById)


//get Ad 
router.get('/ads',getDbAd)

router.get("/ad/:id", getAdById )


//get filter
router.get('/filter', routefilter)

//get Appointments
router.get('/appointments', getAppointments )

//get AppointmentsByProfessional
router.get('/appointments/:professionalMedicalLicense', getAppointmentsByProfessional)

//get AppointmentsByAd
router.get('/appointments/ad/:adId', getAppointmentsByAdAvailable)
    
router.get('/appointments/id/:id' , getAppointmentById)

router.get('/appointments/user/:userEmail' , getAppointmentsByUser)
// ******** POSTS ***********//

// Create a new User. 
router.post('/users',createUser)
 
//create professional 
router.post('/professionals', createProfessional)

//Payment

router.post("/payment", PaymentRoute)

//create Ads 
router.post('/ad', createAds)

//createAppointment
router.post('/appointment', createAppointments)
router.post('/appointment/cancelled', createCancellAppointmentsByUser)


//recover user by mail and password
router.put('/restore',recoverBymail)

//delete user by id
router.put('/delete/:id',deleteUserById)

//******PUT ************//

router.put('/addFavorites', addFavorites)

router.put('/removeFavorites', removeFavorites)

router.put('/user/:idUser', editUser)

router.put('/ad/:AdId', editAd)

router.put('/professional/:MedicalLicense', editProfessional)

//put appointments
router.put('/appointments/edit/:AppId', editAppointments)







module.exports = router;


