const weatherForm=document.querySelector('form');
const weatherInput=document.querySelector('input');
const errorPara=document.querySelector('#errorMessage');
const updatesPara=document.querySelector('#WeatherUpdate')

weatherForm.addEventListener('submit',e=>{
    e.preventDefault();
    fetch(`http://localhost:3000/weather?location=${weatherInput.value}`).then(response=>{
        weatherInput.value=''
        response.json().then(data=>{
            errorPara.textContent='';
            updatesPara.textContent='';
            if(data.error){
                errorPara.textContent=`${data.error}`;
            }
            else{
                updatesPara.textContent=`${data.update}`
            }
        })
    })
})