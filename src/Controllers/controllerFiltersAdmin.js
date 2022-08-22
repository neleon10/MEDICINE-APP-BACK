require("dotenv").config();
const express = require("express");

const {
  User,
  Professional,
  Medicalrecord,
  Comments,
  Appointment,
  Ad,
} = require("../db");

//get users
const getFilterUsers = async (req, res, next) => {
  const { ranking, appointment, createdProf, createdUser, active, noActive } =
    req.query;

  try {
    const allUsers = await User.findAll({ include: [{ model: Appointment, include: [Ad]}] });
    const allUsersUsers = allUsers.filter((user) => user.rol === "user");
    const allUsersProfessionals = allUsers.filter(
      (user) => user.rol === "professional"
    );

    if (appointment) {
      const usersAppointmentsCompleted = allUsersUsers.filter((user) =>
        user.appointments?.map(
          (appointment) => appointment.status === "pending"
        )
      );
      let infoUsers = [];
      
      usersAppointmentsCompleted.forEach((user) => {
        let a = {};
        a["userEmail"] = user.email;
        a["totalAppointments"] = user.appointments.length;
        a["totalPricesAppointments"] = 0;
        user.appointments.map((ap) => {
        console.log(ap.ad.price)
          a.totalPricesAppointments += parseInt(ap.ad.price);
        })
        infoUsers.push(a);
      })
      res.status(200).send(infoUsers);
    }
    if (ranking) {
      if(ranking==='mejores'){
        allUsersProfessionals.sort((a, b) => {
          if (a.ranking > b.ranking) return 1;
          if (a.ranking < b.ranking) return -1;
          return 0;
        });
      }else{
        allUsersProfessionals.sort((a, b) => {
          if (a.ranking > b.ranking) return 1;
          if (a.ranking < b.ranking) return -1;
          return 0;
        });
        
      }
      //devuelve los profesionales ordenados por mayor ranking
      res.status(200).send(allUsersProfessionals);
    }
    // if (createdProf) {
    //   allUsersProfessionals.sort((a, b) => {
    //     if (a.createAt > b.createAt) return 1;
    //     if (a.createAt < b.createAt) return -1;
    //     return 0;
    //   });
    //   //devuelve los profesionales ordenados por ultimos creados
    //   res.status(200).send(allUsersProfessionals);
    // // }
    // if (createdUser) {
    //   allUsersUsers.sort((a, b) => {
    //     if (a.createAt > b.createAt) return 1;
    //     if (a.createAt < b.createAt) return -1;
    //     return 0;
    //   });
    //   //devuelve los usuarios rol user ordenados por ultimos creados
    //   res.status(200).send(allUsersUsers);
    // }
    if (active) {
      allUsers.filter((user) => user.active === true);
      res.status(200).send(allUsers);
    }
    if (noActive) {
      allUsers.filter((user) => user.active === false);
      res.status(200).send(allUsers);
    }
    
  } catch (error) {
    next(error);
  }
};
module.exports={
  getFilterUsers
}
