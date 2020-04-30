window.addEventListener('load', () => {
    startClock();
    //YOUR CODE SHOULD START BELOW THIS LINE
    let latitude=41.257160;//setting default because virtual machine always throws error with location
    let longitude=-95.995102;
    if(navigator.geolocation){//checking existance
        navigator.geolocation.getCurrentPosition((position)=>{
            longitude=position.coords.longitude;
            latitude=position.coords.latitude;
        },()=>{//it will always go to an error in the virtual machines
            console.log("Geolocation isn't working on these virtual machines by the way");
        });
    }
    const end='?lat='+latitude+'&lon='+longitude+'&units=imperial&APPID=ebc169c67362b7f3348b210e96b10367';//all url end the same
    
    function getCurrentWx(){//btn 1
        //alert(url);
        fetch('https://api.openweathermap.org/data/2.5/weather'+end)
        .then(response => response.json())
        .then((weather)=>{//get data
            console.log(weather);
            let div=document.getElementById('currentWxHolder');
            div.innerHTML='';
            let h2=document.createElement('h2');
            h2.appendChild(document.createTextNode(weather.name));
            div.appendChild(h2);
            let div2=document.createElement('div');
            div2.appendChild(document.createTextNode('Current Temp: '+weather.main.temp+'\xB0 F'));
            div.appendChild(div2);
            div2=document.createElement('div');
            div2.appendChild(document.createTextNode('Max Temp: '+weather.main.temp_max+'\xB0 F'));
            div.appendChild(div2);
            div2=document.createElement('div');
            div2.appendChild(document.createTextNode('Min Temp: '+weather.main.temp_min+'\xB0 F'));
            div.appendChild(div2);
        });
    }
    function getFiveDay(){//btn 2
        fetch('https://api.openweathermap.org/data/2.5/forecast'+end)
        .then(response => response.json())
        .then((weather)=>{// get  data
            console.log(weather);
            let div=document.getElementById('fiveDayInfoHolder');
            div.innerHTML='';
            let h2=document.createElement('h2');
            h2.appendChild(document.createTextNode(weather.city.name));
            div.appendChild(h2);
            let div2=document.createElement('div');
            div2.appendChild(document.createTextNode('3 Hour Forecast'));
            div.appendChild(div2);

            for(let a=0;a<3;a++){//make forecast blocks
                div2=document.createElement('div');
                div2.appendChild(document.createTextNode('Forecast Time(UTC): '+weather.list[a].dt_txt.substring(11,13)+' hrs.'));
                div.appendChild(div2);
                div2=document.createElement('div');
                div2.appendChild(document.createTextNode('Temperature: '+weather.list[a].main.temp+' \xB0 F'));
                div.appendChild(div2);
                div2=document.createElement('div');
                div2.appendChild(document.createTextNode('Max Temperature: '+weather.list[a].main.temp_max+' \xB0 F'));
                div.appendChild(div2);
                div2=document.createElement('div');
                div2.appendChild(document.createTextNode('Min Temperature: '+weather.list[a].main.temp_min+' \xB0 F'));
                div.appendChild(div2);
                div.appendChild(document.createElement('hr'));
            }
        });
    }

    for(const button of document.getElementsByTagName('button')){//add ears
        button.addEventListener('click',()=>eval(button.getAttribute('data-id')+'()'));
    }
});