
function getWeatherData(city){
    const apiKey = '2cefc8a259734398ae354537241010';

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
     const url1 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    const temperature = data.current.temp_c; // Temperature in Celsius
    const weather = data.current.condition.text; // Weather condition
    var timeZone = data.location.tz_id; // Get the time 
    const humidity = data.current.humidity


    const hum = document.querySelector(".humidity")

    hum.textContent = "humidity: " + humidity + "%";

    // Update temperature
    document.querySelector(".celsius").textContent = Math.round(temperature) + "°";

    const existingImg = document.querySelector(".weatherbox img")
    if(existingImg) {
        existingImg.remove();
    }
        let img = document.createElement("img");
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = "images/default.png"; // Default image
         
        console.log(weather)

        if (weather.includes("Partly cloudy")) {
            img.src = "images/partly-cloudy.png";
        } else if (weather.includes("rain") ||  weather.includes("Patchy light rain")) {
            img.src = "images/light-rain.png";
        } else if (weather.includes("Sunny")) {
            img.src = "images/sun.png";
        } else {
            // Display default image if no match found
            img.src = "images/default.png";
        }

        document.querySelector(".weatherbox").appendChild(img);

    
   updateNYTime(timeZone)
})





fetch(url1)
    .then(response => response.json())

    .then(data => {
        const minTemp = data.forecast.forecastday[0].day.mintemp_c; // Min temperature in Celsius
        const maxTemp = data.forecast.forecastday[0].day.maxtemp_c; // Max temperature in Celsius


        document.querySelector(".min").innerHTML = "Min temp: " + Math.round(minTemp) + "°";
        document.querySelector(".max").innerHTML = "Min temp: " + Math.round(maxTemp) + "°";

    })


}   


getWeatherData("London")


function handleSearch() {
    const searchInput = document.querySelector('.search');
    const city = searchInput.value.trim();

    if (city) {
        getWeatherData(city);
        console.log(city); // Fetch data for the entered country/city
        document.querySelector(".city").innerHTML = city;
        searchInput.value = ''; // Clear the input field after search
    }
}

// Event listener for Enter key press
document.querySelector('.search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSearch(); // Trigger search when Enter key is pressed
    
    }
});

    //drooo



    function updateNYTime(timeZone) {
        const now = new Date();
    
        const options = {
            timeZone: timeZone,
            weekday: 'long',
            day: "numeric",

            month: "short",
        };
    
        const nyTime = now.toLocaleTimeString('en-US', {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    
        const nyDate = now.toLocaleDateString('en-US', options);
    
        // Combine time and date without the extra time
        const formatted = `${nyTime} - ${nyDate}`;
    
        document.getElementsByClassName("time")[0].textContent = formatted;
        console.log(formatted);
    }
    

  










