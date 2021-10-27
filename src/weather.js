const axios = require('axios').create({baseURL:'http://api.weatherstack.com/'});
// const request=require('postman-request');
// const chalk=require('chalk');
const log=console.log;
// Make a request for a user with a given ID
const getWeatherUpdate=(city,callback)=>{
  // const url=`http://api.weatherstack.com/current?access_key=74fb8158ed49ec5ad4ca2feee4bc89f8&query=${city}`
    // log(chalk.green.inverse(`Trying to fetch weather updates for ${city}...`))
    // using axios
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
          const {weather_descriptions,temperature,precip}=response.data.current;
          callback(undefined,`Weathe appears to be ${weather_descriptions[0]}.It is currently ${temperature} degree and chance of rain is ${precip}%`)
        }
        
      })
      .catch(function (error) {
        callback('Unable to connect to Weather service',undefined);
      })
      .then(function () {});

    //using postman-request
//   request({url,json:true},(error,response)=>{
//     if(error){
//       log(chalk.red('Unable to connect to weather service!'));
//     }else if(response.body.error){
//       log(chalk.red('Unable to find location!'))
//     }
//     else{
//       const required_details=response.body.current;
//       log(chalk.white(`Weathe appears to be ${required_details.weather_descriptions[0]}.It is currently ${required_details.temperature} degree and chance of rain is ${required_details.precip}%`));
//     }
//   })
}

module.exports=getWeatherUpdate;
