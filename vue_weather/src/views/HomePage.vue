<template>
  <div class="text-secondary">
    <!-- <h1>Weather</h1> -->
    <div class="bg-orange-900  ">Search</div>
    <div class="flex flex-row">
      
      
      <!-- left element -->
      <div class="flex-col  w-[60%]">
        <!-- <div v-if="weather"> -->
        <div >
          <div class="flex flex-row justify-between ">
            <div class="w-[70%] flex flex-col justify-between h-[200px] py-4">
              <div>
                <h1 class="text-white text-2xl "> weather.name </h1>
                <h1 class="text-secondary "> Thailand </h1>
              </div>
              <h1 class="items-end text-white font-bold tracking-wide	 text-3xl"> weather.main.temp °C</h1>
            </div>

            <div class=" w-[30%] flex justify-center	items-center ">
              <img class="w-15 h-[150px]" src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-512.png" alt="icon-weather-now">
            </div>
          </div>


          <p>Humidity: weather.main.humidity %</p>
          <p>Wind Speed:  weather.wind.speed  m/s</p>
          
        </div>
      </div>
      





      
      <!-- right element -->
      <div class="flex flex-col w-[40%]">
        สรุปอากาศของทั้งสัปดาห์
      </div>




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
  created() {
    // this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getWeather, this.showError);  // this.getWeather: ฟังก์ชัน callback ที่จะถูกเรียกเมื่อโลเคชั่นของผู้ใช้ถูกดึงมาเรียบร้อยแล้ว ฟังก์ชันนี้จะรับ parameter เป็น object position ที่มีพิกัด latitude และ longitude
        this.getWeather();
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
        console.log("data I received from weather api :", response.data);
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
