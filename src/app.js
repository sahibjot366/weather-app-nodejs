const path=require('path');
const express=require('express');
const app=express();
const hbs=require('hbs');
const getWeatherUpdate=require('./weather.js');
const publicDirectoryPath=path.join(__dirname,'../public/');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates//partials');
const port=process.env.PORT || 3000;
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
    res.render('index',{
        name:"Sahibjot Singh",
        title:"Weather App"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Screen",
        name:"Sahibjot Singh"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Screen",
        name:"Sahibjot Singh"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:"Location not Found.Please enter a location!"
        })
    }
    getWeatherUpdate(req.query.location,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            update:data
        });
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('helpnotfound',{
        errorMessage:'Help article not found!'
    })
})
app.get('*',(req,res)=>{
    res.render('notfound',{
        errorMessage:'404 Page Not Found!'
    })
})
app.listen(port,()=>{
    console.log(`Server running on port ${port}...`);
})