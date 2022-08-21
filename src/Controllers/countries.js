let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;


 


const countries=async(req, res, next)=>{
  try {
    let countries= Country.getAllCountries() 
   let todoslospaises= countries.map(e=>{
      return{
      countryId: e.isoCode,
     name : e.name}
    })
    console.log('aaaahhh',todoslospaises)
    res.status(200).send(todoslospaises)
    
  } catch (error) {
    next(error)
  }
}
const states=(req,res,next)=>{
  let {countryId}= req.params;
  console.log(countryId);
  let state= State.getStatesOfCountry(countryId)
  let model= state.map(e=>{
    return{
      countryId:e.countryCode,
      provinceId:e.isoCode,
      name: e.name
    }
  })
  res.status(200).send(model)
}
const cities=(req,res,next)=>{
  let {countryId, stateId}= req.params;
  console.log(countryId, stateId);
  let cities= City.getCitiesOfState(countryId,stateId)
  let model= cities.map(e=>{
    return{
  
      name: e.name
    }
  })
  res.status(200).send(model)
}


  
  
    
  
  

module.exports={
    countries,
    states,
    cities
  
  };


