const express = require('express')
const {Op} = require("sequelize")
const  {User , Professional , Medicalrecord , Comments , Appointment , Ad }= require('../db')


const routefilter=async(req,res,next)=>{

    try {
        const {name, specialty, country, province, city}= req.query

        console.log('soy QUERY=>', req.query)
        
        const adFilter = await Ad.findAll({ 
          include: [{ model: Professional, include: [User] }],
      })
        
        let newFilter = []
        
        if(name === 'undefined'){
            console.log('no tengo nombre, tengo otro argumento')
            if(specialty=== 'undefined'){
                console.log('no tengo especialidad, tengo otro argumento')
               
                if(country !== 'undefined' || province !== 'undefined' || city !== 'undefined'){
                    
                    if(country !== 'undefined' ){
                        newFilter= adFilter.filter(e=>e.professional.user.country=== country)
                        console.log('soy pais=> new filter')
                        return res.status(200).send(newFilter)
                    }
                    
                    if(province !== 'undefined'){
                        newFilter= adFilter.filter(e=> e.professional.user.province=== province)
                        return res.status(200).send(newFilter)
                    }
                    else{
                        
                        newFilter= adFilter.filter(e=> e.professional.user.city=== city)
                        console.log('pais=>', newFilter)
                        return res.status(200).send(newFilter)
                    }
                }
            }
            else{
                               
                    console.log('entre en el correcto, solo especialidad!!!!!!')
                    newFilter= adFilter.filter(e=> e.specialty===specialty)
                    return res.status(200).send(newFilter)              
            }
        }
        else{
          console.log('entre en existe nombre')
            const adFilterByName = await Ad.findAll({ 
                include: [{ model: Professional, include: [User] }]})

            const responseName = adFilterByName.filter(e=> e.professional.user.name.includes(name))   
                  console.log('Soy quien te parte la cabeza=>',adFilterByName)
                  return res.status(200).send(responseName) 
               
            
        }
    } catch (e) {
        next(e)
    }

}


module.exports = {routefilter};
//aca filtros
