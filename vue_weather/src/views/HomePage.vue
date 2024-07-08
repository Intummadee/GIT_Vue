<template>
  <div class="text-secondary bg-sky-400">
    <h1>Weather</h1>
    <button @click="getLocation" class="bg-slate-100">Get Weather for Current Location</button>
    <div v-if="weather">
      <h2>{{ weather.name }}</h2>
      <p>Temperature: {{ weather.main.temp }}°C</p>
      <p>Humidity: {{ weather.main.humidity }}%</p>
      <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "HomePage",
  data() {
    return {
      weather: null,
      apiKey: '6350e580276f65d9e82089330153e8a7',
      lat:33.44,
      lon:-94.04
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getWeather, this.showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    getWeather(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(lat , lon);
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${this.apiKey}`)
        .then(response => {
          this.weather = response.data;
        })
        .catch(error => {
          console.error("There was an error getting the weather data!", error);
        });
    },
    showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    }
  }
}
</script>
