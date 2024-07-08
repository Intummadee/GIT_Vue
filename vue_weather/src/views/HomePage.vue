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
      apiKey: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
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
    async getWeather(position) {
      // async มันสามารถหยุดรอการทำงานในบางจุดโดยไม่ขัดขวางการทำงานของโค้ดส่วนอื่น
      // ฟังก์ชัน async จะคืนค่าเป็น Promise โดยอัตโนมัติ ซึ่งสามารถใช้ .then() หรือ await เพื่อรับค่าที่ส่งกลับมา
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat , lon);
        // ใช้ await เพื่อรอการตอบสนองจาก axios.get()
        // ภายในฟังก์ชัน async คุณสามารถใช้คีย์เวิร์ด await เพื่อรอผลลัพธ์จากการทำงานที่ใช้เวลานาน เช่น การเรียก API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);

        // เมื่อการร้องขอสำเร็จ ให้เก็บข้อมูลใน weather
        this.weather = response.data;
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
      }
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
