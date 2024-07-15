<template>
  <div class="text-secondary">
    <!-- <h1>Weather</h1> -->

    
    <div class="flex flex-row">
      <!-- left element -->
      <div class="flex-col w-[60%]">
        <input v-model="searchCity" placeholder="Search City"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <p>{{ searchCity }}</p>

        <!-- Weather Data -->
        <div v-if="weather">
          <div class="flex flex-row justify-between ">
            <div class="w-[70%] flex flex-col justify-between h-[200px] py-4">
              <div>
                <h1 class="text-white text-2xl font-bold"> {{weather.name}} </h1>
                <div v-show="findWeatherBeforeCountTime">
                  <h1 class="text-secondary "> {{ currentTimeInLocationUpdate }} | {{ timezone }}</h1>
                </div>
                
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
                  <p class="text-base">{{weather.title}} : </p>
                  <h5 class="text-white font-bold text-2xl ">{{weather.data}} </h5>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-second rounded-2xl p-4 mt-5" v-if="dataEachThreeHoursForecast">
            <div>Forecast 3 Hours</div>
            <div class="grid grid-cols-6 ">
              <div class="flex flex-col justify-items-center justify-self-center p-4 text-center" v-for="( eachThreeHoursForecast , index ) in dataEachThreeHoursForecast" :key="index">
                
                  <p >{{ eachThreeHoursForecast.dt }} </p>
                  <img :src="eachThreeHoursForecast.icon" alt="iconWeather" class="w-[80px] h-[80px]">
                  <p>{{ eachThreeHoursForecast.temp }} °C</p>
                
                
                
              </div>
            </div>
            
          </div>


          
        </div>
      </div>
      






      <!-- right element -->
      <div class="flex flex-col w-[40%] ml-[4rem] ">
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
      currentTimeInLocation: "", // หาเวลาตาม location เช่น Asia/Bangkok , America/New_York
      currentTimeInLocationUpdate:"", // อัพเดตเวลาเรื่อยๆทุกๆ 1 วินาที
      dataForSevenForecast : [],
      dataEachThreeHoursForecast : [],
      searchCity: "",
      findWeatherBeforeCountTime: false
    }
  },
  created() {
    this.getLocation();
    if(this.findWeatherBeforeCountTime == true){
      setInterval(this.updateTime, 1000); 
    } // setTimeout: ทำงานครั้งเดียวหลังจากผ่านไป 5 วินาที
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

        

        
        
        console.log("");
        // const response_bulk_sevenday =  await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${this.apiKey}`)
        // console.log("response_bulk_sevenday : 🏳️‍🌈🏳️‍🌈" , response_bulk_sevenday);
        console.log("");
        
        const response_forecase_sixteenDay = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${this.apiKey}`)
        const list_Forecast_sixteenDay = [...response_forecase_sixteenDay.data.list];
        console.log("response_forecase_sixteenDay 🔆🔆: " , list_Forecast_sixteenDay);
        console.log("");


        // icon เปลี่ยนไปตาม สภาพภูมิอากาศ 
        const iconMap = {
          Clouds: require("@/assets/icon/Clouds.png"),
          Rain: require("@/assets/icon/Rain.png"),
          Thunderstorm: require("@/assets/icon/Thunderstorm.png"),
          Drizzle: require("@/assets/icon/Drizzle.png"),
          Snow: require("@/assets/icon/Snow.png"),
          Atmosphere: require("@/assets/icon/Atmosphere.png"),
          Clear: require("@/assets/icon/Clear.png")
        };

        // แสดงสภาพอากาศในอีก 7 วัน
        // Ref => https://openweathermap.org/api/one-call-3#multi
        const response_daily = (await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily&units=metric&appid=${this.apiKey}`)).data
        console.log("response_daily 🌏🌏", response_daily);
        



        // 3, 6, 9 ,12 , 15, 18 
        for (let i = 3; i < 19; i+=3) {
          let timestamp = response_daily.hourly[i].dt;
          let date = new Date(timestamp * 1000); // คูณ 1000 เพื่อแปลงเป็นมิลลิวินาที
          let year = date.getFullYear();
          let month = date.getMonth() + 1; // getMonth() จะเริ่มต้นที่ 0 (มกราคม = 0), จึงต้องบวก 1 เพื่อเริ่มจาก 1 (มกราคม)
          let day = date.getDate();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let seconds = date.getSeconds();
          let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
          console.log(`Timestamp ${timestamp} แปลงเป็นวันที่และเวลาคือ: ${formattedDate}`);
          let response_daily_copy =  response_daily.hourly[i]
          response_daily_copy.icon = iconMap[response_daily_copy.weather[0].main] || ""
          response_daily_copy.dt = `${hours}:00`
          this.dataEachThreeHoursForecast.push(response_daily_copy)
        }
        

        
        


        // dataForSevenForecast


        // ⁡⁢⁢⁢หาเวลา ตาม location⁡ ================================================
        this.currentTimeInLocation =  response_daily.timezone;
        // ====================================================================
      

        

        // ⁡⁢⁢⁢ข้อความแสดงประเทศ และ ทวีป⁡ เช่น TH , Asia ============================
        let city = response_daily.timezone.split('/')
        let timezone_data = `${response.data.sys.country} , ${city[0]}`; // Bangkok TH , Asia
        this.timezone = timezone_data;
        // ====================================================================
        
        
        
        // ⁡⁢⁣⁢Set weather information⁡ ============================================
        // Ref => https://openweathermap.org/current
        this.weather = response.data;
        console.log("response.data || this.weather ୭ 🧷 ✧ ˚. ᵎᵎ 🎀 :", response.data);
        let weather_rain = this.weather.rain == null ? "0" : `${this.weather.rain['1h']}`;
        let weather_snow = this.weather.snow == null ? "0" : `${this.weather.snow['1h']}`;
        this.dataOfWeather.push(
          {id:1, title:"Humidity" , data: `${this.weather.main.humidity} %`, image: require('@/assets/icon/humidity.png')}, 
          {id:2, title:"Wind Speed" , data: `${this.weather.wind.speed} meter/sec` , image: require('@/assets/icon/wind_speed.png')},
          {id:3, title:"Cloudiness" , data: `${this.weather.clouds.all} %` , image: require('@/assets/icon/cloud.png')},
          {id:4, title:"Rain volume" , data: `${weather_rain} mm` , image: require('@/assets/icon/rain_icon_data.png')},
          {id:5, title:"Visibility" , data: `${this.weather.visibility / 1000} km` , image: require('@/assets/icon/visibility.png')},
          {id:6, title:"Snow" , data: `${weather_snow} mm` , image: require('@/assets/icon/snow_icon.png')},
        )
        // ====================================================================
        
        
        
        
        // ⁡⁢⁢⁢กำหนดไอคอนตามสภาพอากาศ⁡ ============================================
        var weather_now = response.data.weather[0]; // weather_now = {id: 801, main: 'Clouds', description: 'few clouds', icon: '02n'}
        console.log("weather_now 🏰🏰₊˚⊹♡🎠✨ : ", response.data.weather[0]);
        // All condition ==> https://openweathermap.org/weather-conditions
        weather_now.icon = iconMap[weather_now.main] || ""; // ถ้าไม่พบ main ใน iconMap จะกำหนดเป็น "" 
        this.current_data_weather = weather_now;
        // ====================================================================
        
        
        
        this.findWeatherBeforeCountTime = true; // เปลี่ยนเปน true เพื่อให้นับเวลาตามวิ
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
        console.log("message: ❌❌❌❌ มี error เกิดขึ้นในฟังชัน getWeather ==> ",error.message);
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
    },
    updateTime() {
      // ฟังชันไว้อัพเดตเวลาทุกๆ 1 วินาที
      const options = {
          timeZone: this.currentTimeInLocation,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const now = new Date();
        const result =  formatter.format(now);
        // console.log(`Current time in ⚽⚽⚽ ${this.currentTimeInLocation}: ${result}`);
        this.currentTimeInLocationUpdate = result;
    },
    convertTimestamp(timestamp) {
      const date = new Date(timestamp * 1000); // คูณ 1000 เพื่อแปลงเป็นมิลลิวินาที
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() จะเริ่มต้นที่ 0 (มกราคม = 0), จึงต้องบวก 1 เพื่อเริ่มจาก 1 (มกราคม)
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      console.log(`Timestamp ${timestamp} แปลงเป็นวันที่และเวลาคือ: ${formattedDate}`);
      return formattedDate;
    }
  }
}
</script>
