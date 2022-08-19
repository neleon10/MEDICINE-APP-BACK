const { Router } = require('express');
//const {Appointment} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');





const {createAppointments, getAppointments, getAppointmentsByProfessional, getAppointmentsByAd, editAppointments, createCancellAppointmentsByUser ,getAppointmentById, getAppointmentsByAdAvailable, getAppointmentsByUser, deleteAppointment} = require('../Controllers/controllerAppointments')
const {routefilter} = require('../Controllers/controllerFilters')
const {countries, states, cities}= require('../Controllers/countries')
const { PaymentRoute } = require('../Controllers/controllerStripePay')
const  { getAllUsers,getPro,getDbAd,createUser,createProfessional,createAds, getProfessionalById, userId, getAdById, addFavorites, removeFavorites, editProfessional, editUser, editAd,deleteUserById,recoverBymail, deleteUserByAdmin, forgivenByAdmin }  = require ('../Controllers/getPostControllers')
const {getName}= require('../Controllers/controllerSearch');
const { route } = require('../app');





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

//get names

router.get('/ads', getName)

//get countries

router.get('/countries',countries );
router.get('/states/:countryId', states)
router.get('/cities/:countryId/:stateId', cities)


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

router.delete('/delete/:id', deleteAppointment)



router.put('/Admindelete/:id',deleteUserByAdmin)


router.put('/Adminforgive/:email',forgivenByAdmin)


module.exports = router;


