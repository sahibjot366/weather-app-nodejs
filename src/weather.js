const axios = require('axios').create({baseURL:'http://api.weatherstack.com/'});
const getWeatherUpdate=(city,callback)=>{
  // const url=`http://api.weatherstack.com/current?access_key=74fb8158ed49ec5ad4ca2feee4bc89f8&query=${city}`
    axios.get('/current',{
        params:{
            access_key:'74fb8158ed49ec5ad4ca2feee4bc89f8',
            query:city
        }
    })
      .then(function (response) {
        if(response.data.error){
          callback('Unable to find location!',undefined);
        }
        else{
          const {weather_descriptions,temperature,precip,feelslike}=response.data.current;
          const {name,region,country}=response.data.location;
          callback(undefined,`Showing current Weather for ${name},${region},${country}:\nIt appears to be ${weather_descriptions[0]}.Current Temperature is  ${temperature}°C but it feels like ${feelslike}°C.Chance of rain is ${precip}%`)
        }
        
      })
      .catch(function (error) {
        callback('Unable to connect to Weather service',undefined);
      })
      .then(function () {});

}

module.exports=getWeatherUpdate;
