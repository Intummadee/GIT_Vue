<template>
  <div class="text-secondary">
    <!-- <h1>Weather</h1> -->
    <div class="bg-orange-900  ">Search</div>
    <div class="flex flex-row">
      
      
      <!-- left element -->
      <div class="flex-col  w-[60%]">
        <div v-show="weather">
        <!-- <div > -->
          <div class="flex flex-row justify-between ">
            <div class="w-[70%] flex flex-col justify-between h-[200px] py-4">
              <div>
                <h1 class="text-white text-2xl "> {{weather.name}} </h1>
                <h1 class="text-secondary "> {{ timezone }}</h1>
              </div>
              <h1 class="items-end text-white font-bold tracking-wide	 text-4xl"> {{ current_data_weather.main }} {{ weather.main.temp }} °C</h1>
            </div>

            <div class=" w-[30%] flex justify-center	items-center ">
              <img v-show="current_data_weather" class="w-15 h-[150px]" :src="current_data_weather.icon" alt="Weather Icon">
            </div>
          </div>



          <div class="bg-second rounded-2xl p-4">
            <div>Data</div>
            <div class="grid grid-cols-2 mt-5 gap-6">
              <div class="flex " v-for="(weather) in dataOfWeather" :key="weather.title">
                <img :src=weather.image alt="Humidity" class="w-[25px] h-[25px]">
                <div class="ml-1 border-l-4 pl-2 border-first">
                  <p class="text-base">{{weather.title}}:</p>
                  <h5 class="text-white font-bold text-2xl ">{{weather.data}} </h5>
                </div>
              </div>
            </div>

          </div>
          
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
      dataOfWeather : [],
      timezone: "",
      current_data_weather: null,
    }
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getWeather, this.showError);  // this.getWeather: ฟังก์ชัน callback ที่จะถูกเรียกเมื่อโลเคชั่นของผู้ใช้ถูกดึงมาเรียบร้อยแล้ว ฟังก์ชันนี้จะรับ parameter เป็น object position ที่มีพิกัด latitude และ longitude

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
        // console.log(lat , lon);
        // ใช้ await เพื่อรอการตอบสนองจาก axios.get()
        // ภายในฟังก์ชัน async คุณสามารถใช้คีย์เวิร์ด await เพื่อรอผลลัพธ์จากการทำงานที่ใช้เวลานาน เช่น การเรียก API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);

        const response_daily = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${this.apiKey}`)
        console.log("daily ", response_daily);

        // ข้อความใต้ แสดงภูมิประเทศ
        let city = response_daily.data.timezone.split('/')
        let timezone_data = `${city[1]} ${response.data.sys.country} , ${city[0]}`; // Bangkok TH , Asia
        this.timezone = timezone_data;

        // เมื่อการร้องขอสำเร็จ ให้เก็บข้อมูลใน weather
        console.log("data I received from weather api :", response.data);
        // ⁡⁢⁣⁢Set weather information⁡ 
        this.weather = response.data;
        // console.log("this.weather.rain : ",this.weather.rain);
        this.dataOfWeather.push(
          {id:1, title:"Humidity" , data: `${this.weather.main.humidity} %`, image: require('@/assets/icon/humidity.png')}, 
          {id:2, title:"Wind Speed" , data: `${this.weather.wind.speed} m/s` , image: require('@/assets/icon/wind_speed.png')},
          {id:3, title:"Cloudiness " , data: `${this.weather.clouds.all} %` , image: require('@/assets/icon/cloud.png')},
          {id:3, title:"Rain volume " , data: `${this.weather.rain['1h']} mm` , image: require('@/assets/icon/rain_icon_data.png')},
          // {id:3, title:"rain" , data: `${this.weather.rain} mm` , image: require('@/assets/icon/wind_speed.png')},
        )
        
        
        var weather_now = response.data.weather[0]; // weather_now = {id: 801, main: 'Clouds', description: 'few clouds', icon: '02n'}
        console.log("weather_now : ", weather_now);

        // All condition ==> https://openweathermap.org/weather-conditions
        if(weather_now.main == "Clouds"){
          weather_now.icon = require("@/assets/icon/Clouds.png"); 
        }
        else if(weather_now.main == "Rain"){
          weather_now.icon = require("@/assets/icon/Rain.png"); 
        }
        else if(weather_now.main == "Thunderstorm"){
          weather_now.icon = require("@/assets/icon/Thunderstorm.png"); 
        }
        else if(weather_now.main == "Drizzle"){
          weather_now.icon = require("@/assets/icon/Drizzle.png"); 
        }
        else if(weather_now.main == "Snow"){
          weather_now.icon = require("@/assets/icon/Snow.png"); 
        }
        else if(weather_now.main == "Atmosphere"){
          weather_now.icon = require("@/assets/icon/Atmosphere.png"); 
        }
        else if(weather_now.main == "Clear"){
          weather_now.icon = require("@/assets/icon/Clear.png"); 
        }

        this.current_data_weather = weather_now;
        // "Clouds"


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
