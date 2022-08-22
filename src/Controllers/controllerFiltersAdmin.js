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

    if (appointment !== "undefined") {
      console.log("entre en mejoresUsers")
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
    if (ranking !== "undefined") {
      console.log("entre en ranking")
      if(ranking==='mejores'){
        console.log("entre en mejores")
        const filterRankProffesional = allUsersProfessionals.sort((a, b) => {
          if (a.ranking > b.ranking) return 1;
          if (a.ranking < b.ranking) return -1;
          return 0;
        });
        res.status(200).send(filterRankProffesional);
      }else{
        const filterRankProffesional = allUsersProfessionals.sort((a, b) => {
          if (a.ranking > b.ranking) return 1;
          if (a.ranking < b.ranking) return -1;
          return 0;
        });
        res.status(200).send(filterRankProffesional);
      }
      //devuelve los profesionales ordenados por mayor ranking
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
    if (active !== "undefined") {
      console.log("entre en active")
      const activeUsers = allUsers.filter((user) => user.active === true);
      res.status(200).send(activeUsers);
    }
    if (noActive !== "undefined") {
      console.log("entre en inactive")
      const inactiveUsers = allUsers.filter((user) => user.active === false);
      res.status(200).send(inactiveUsers);
    }
    
  } catch (error) {
    next(error);
  }
};



























const designeAdmin = async (req, res, next) => {
  const { id } = req.params;
  console.log (id)
  try {
    const userDesigneAdmin = await User.update( 
    {
      rol: "admin",
    },
    {
      where: { id },
    }
  );
    if (userDesigneAdmin.rol !== "admin")
      return res
        .status(404)
        .send({ message: "No pudimos pasar a admin a este usuario" });
    else res.status(200).send({ message: "usuario pasado a admin con exito" });
  } catch (e) {
    next(e);
  }
};


const degredeAdmin = async (req, res, next) => {
  const { id } = req.params;
  console.log (id)
  try {
    const userdegredeAdmin = await User.update( 
    {
      rol: "usuario"
    },
    {
      where: { id },
    }
  );
    if (userdegredeAdmin.rol !== "usuario")
      return res
        .status(404)
        .send({ message: "No pudimos pasar a usuario a este admin" });
    else res.status(200).send({ message: "ya no es admin" });
  } catch (e) {
    next(e);
  }
};



module.exports={
  getFilterUsers,
  designeAdmin,
  degredeAdmin
}
