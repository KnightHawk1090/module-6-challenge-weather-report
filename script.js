$(document).ready(function(){
    const nameOfCity = '';
    const historyList = document.querySelector('#historyList');
    let pastCities = [];

    const currentDay = moment().format('MMMM Do, YYYY');
    $('#currentDay').text(currentDay);

    const secondDay = moment()
    .add(1, 'days')
    .format('l');
    $('#secondDay').text(secondDay.slice(0,9));
    console.log(secondDay);

    const thirdDay = moment()
    .add(2, 'days')
    .format('l');
  $('#thirdDay').text(thirdDay.slice(0, 9));

    const fourthDay = moment()
    .add(3, 'days')
    .format('l');
    $('#fourthDay').text(fourthDay.slice(0,9));

    const fifthDay = moment()
    .add(4, 'days')
    .format('l');
    $('#fifthDay').text(fifthDay.slice(0,9));

    const sixthDay = moment()
    .add(5, 'days')
    .format('l');
    $('#sixthDay').text(sixthDay.slice(0,9));

    
    function citySearch() {
        //searchHistory.innerHTML = '';
        historyList.innerHTML = '';

        $('#historyList').epmty();


        for(let i = 0; i < citySearch.length; i++) {
            const cityChoice = $('<button');
            cityChoice.addclass('newCityBtn');
            cityChoice.text(citySearch[i]);
            cityChoice.attr('data-name', citySearch[i]);
            $('#historyList').append(cityChoice);
            $('#historyList').attr('style', 'display:block' );
        }
    }

    //able to click on searched cites
    $(document).on('click', '.newCityBtn', function(){
        currentWeather($(this).text());
    });

    function init() {
        //read local storage for the prevously searched cities
        const previousSearches = JSON.parse(
            localStorage.getItem('pastCities')
        );

        if(previousSearches !== null) {
            pastCities = previousSearches;
        }
        renderpastCities();
    }

    function savepastCities() {
        localStorage.setItem('pastCities', JSON.stringify(pastCities));

    }

    // API Request
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();
    
        let cityName = $('#cityNameSearch')
          .val()
          .trim();
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); // First letter of char capitalized
        currentWeather(cityName);
    
        $('#searchHistoryList').on('click', function(event) {
          event.preventDefault();
    
          const cityName = $(this).text();
          currentWeather(cityName);
    
          // Return from function early if submitted cityNameSearchText is blank
          if (cityName !== null) {
            city = cityName[0].name;
          }
        });
    
        // Add new cityNameSearchText to previous searches array
        pastCities.push(cityName);
        cityName.value = '';
    
        // Store updated previous searches in localStorage and add to list
        savepastCities();
        renderpastCities();
      });
    
      // Click on previous city button
      $(document).on('click', 'newCity', function() {
        currentWeather($(this).text());
      });
    
      // Display Current Weather
      function currentWeather(cityName) {
        apiKey = '06606e544a946ac567964601f7ed0813';
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
        const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    
        $.ajax({
          url: queryURL,
          method: 'GET',
        }).then(function(response) {
          const iconCode = response.weather[0].icon;
          const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const city = response.name;
          const temp = Math.round(response.main.temp);
          const { humidity } = response.main;
          const windSpeed = response.wind.speed;
          const { lat } = response.coord;
          const { lon } = response.coord;
          const indexQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          // console.log(response)
    
          $('#city').text(city);
          $('#temp').text(`Temperature: ${temp}° F`);
          $('#humidity').text(`Humidity: ${humidity} %`);
          $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
          $('#weatherIcon').attr('src', iconURL);
    
          // Uv Index
          $.ajax({
            url: indexQueryURL,
            method: 'GET',
          }).then(function(resp) {
            $('#uvIndex').text(`UV Index: ${resp.value}`);
          });
        });
    
        // 5 Day Forecast
        $.ajax({
          url: fiveDayQueryURL,
          method: 'GET',
        }).then(function(response) {
          // Day 1
          var iconCode = response.list[0].weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
          $('#iconTwo').attr('src', iconURL);
          $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
          $('#weatherIconTwo').attr('src', iconURL);
    
          // Day 2
          var iconCode = response.list[8].weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          $('#tempThree').text(`Temp: ${parseInt(response.list[8].main.temp)}° F`);
          $('#iconThree').attr('src', iconURL);
          $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);
          $('#weatherIconThree').attr('src', iconURL);
    
          // Day 3
          var iconCode = response.list[16].weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          $('#tempFour').text(`Temp: ${parseInt(response.list[16].main.temp)}° F`);
          $('#iconFour').attr('src', iconURL);
          $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);
          $('#weatherIconFour').attr('src', iconURL);
    
          // Day 4
          var iconCode = response.list[24].weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          $('#tempFive').text(`Temp: ${parseInt(response.list[24].main.temp)}° F`);
          $('#iconFive').attr('src', iconURL);
          $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);
          $('#weatherIconFive').attr('src', iconURL);
    
          // Day 5
          var iconCode = response.list[32].weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
          $('#iconSix').attr('src', iconURL);
          $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
          $('#weatherIconSix').attr('src', iconURL);
        });
      }
      // Geolocation
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        apiKey = '06606e544a946ac567964601f7ed0813';
        const queryLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    
        // Current Weather
        $.ajax({
          url: queryLocationURL,
          method: 'GET',
        }).then(function(response) {
          // console.log(response);
          const iconCode = response.weather[0].icon;
          const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const city = response.name;
          const temp = parseInt(response.main.temp);
          const humidity = parseInt(response.main.humidity);
          const windSpeed = parseInt(response.wind.speed);
          const { lat } = response.coord;
          const { lon } = response.coord;
    
          $('#city').text(city);
          $('#temp').text(`Temperature: ${temp}° F`);
          $('#humidity').text(`Humidity: ${humidity} %`);
          $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
          $('#weatherIcon').attr('src', iconURL);
    
          $.ajax({
            url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
            method: 'GET',
          }).then(function(response) {
            $('#uvIndex').html(`UV Index: ${response.value}`);
          });
    
          // 5 Day Forecast
          $.ajax({
            url: fiveDayQueryURL,
            method: 'GET',
          }).then(function(response) {
            // Day 1
            var iconCode = response.list[0].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
            $('#iconTwo').attr('src', iconURL);
            $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
            $('#weatherIconTwo').attr('src', iconURL);
    
            // Day 2
            var iconCode = response.list[8].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempThree').text(
              `Temp: ${parseInt(response.list[8].main.temp)}° F`
            );
            $('#iconThree').attr('src', iconURL);
            $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);
            $('#weatherIconThree').attr('src', iconURL);
    
            // Day 3
            var iconCode = response.list[16].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempFour').text(
              `Temp: ${parseInt(response.list[16].main.temp)}° F`
            );
            $('#iconFour').attr('src', iconURL);
            $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);
            $('#weatherIconFour').attr('src', iconURL);
    
            // Day 4
            var iconCode = response.list[24].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempFive').text(
              `Temp: ${parseInt(response.list[24].main.temp)}° F`
            );
            $('#iconFive').attr('src', iconURL);
            $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);
            $('#weatherIconFive').attr('src', iconURL);
    
            // Day 5
            var iconCode = response.list[32].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
            $('#iconSix').attr('src', iconURL);
            $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
            $('#weatherIconSix').attr('src', iconURL);
          });
        });
      });
    });