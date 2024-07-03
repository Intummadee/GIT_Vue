# Ohmmm-Amulet-Shop
 






## สร้างโปรเจ็กต์ Vue.js ด้วย Vue CLI
```npm install -g @vue/cli``` : ติดตั้ง Vue CLI
```vue create my-vue-project``` : สร้างโปรเจ็กต์ Vue

- check version
```vue --version``` => @vue/cli 5.0.8

## How to run FrontEnd
```
cd .\my-vue-project\
npm run serve
```

- trick create component
```<>```


<details>
<summary><h2>Basic Vue</h2></summary>

- วิธีผูก attribute เข้ากับ data ใช้ v-bind โดยย่อด้วยการใส่แค่ colon(:)
```JS
<img v-bind:src="picture" :width="width"/>
<a :href="social">Social</a>
data(){
    return{
        picture:"https://encrypted-tbn0.gstatic.com/images?q",
        width:120,
        social:https://www.google.com
    }}
```

- Array , Object , v-if , v-show , computed , watchers
```JS
<p> {{ animals[0] }} and {{ general.gender }} </p>
<p v-if="animals.length === 0">There are no animals at all.</p>
<div v-else>
    {/* Array */}
    <ul>
        <li v-for="(animal, index) in animals" :key="index">{{ animal }}</li>
    </ul>
    {/* Object */}
    <ul>
        <li v-for="(item, key) in general" :key="key"> {{ key }} - {{ item }} </li>
    </ul>

    <button @click="toggleVisible">{{ isVisible ? "hide" : "show" }} detail</button>
    <p v-show="isVisible">Detail 🧐</p>
</div>

{/* Computed */}
<h1>Computed : {{ getIncome }} </h1>
<h1>Computed : {{ getDepartMent }} </h1> 

    data(){
        return{
            animals:["dog", "cat", "panda"],
            general:{gender"girl" , age:"12", status:false},
            isVisible:false,
            salary:1000
        }},
    methods:{
        toggleVisible(){
            this.isVisible = !this.isVisible;
    }},
    computed:{ // watcher = track change , computed = store the result of change  
        getIncome() {
            return ${this.salary} * 12;
        },
        getDepartMent(){
            return this.salary >= 30000 ? "Wow" : "Fight"; // It is not recommended to insert this condition into a template. Most will be put in computed.
            // Templates are not popular for writing logic.
        }
    },
    watch:{
        salary(value){
            if(value > 50000){
                alert("yay u did it");
                setTimeout(()=>{
                    this.salary = 20000
                },2000) // delay 2 seconds to reset salary.
            }
        }
    },
    
    
```

- Pattern
```JS
<template>
  <section>
    <h1>Hello world</h1>
    <h1>{{ text }}</h1>
    <h1>{{ getText() }}</h1>
  </section>
</template>
<script>
export default {
  name: 'App',
  data(){
    return{
      text:"hello world",
    }
  },
  methods:{
    getText(){
      return this.text + "!!!"
    }
  }
}
</script>
<style></style>
```


- Form & Ref & Input
```JS
<form @submit="submitForm">
    <label>ป้อนชื่อเล่น : </label>
    <input type="text" v-on:input="setNickName" ref="nicknameEl" />
    <button type="submit">บันทึก</button>
</form>
methods:{
    submit(e){
        e.preventDefault(); // => Prevent reset of form fields , But it can be shortened by deleting this line and adding it directly to the form 
        // <form @submit.prevent="submitForm">
        alert("Hello")
        this.nickname = this.$refs.nicknameEl.value;
    },
    setNickName(event){
        console.log(event.target.value);
    }
}
```


- Event Modifier : Check what type of event it is ex. right-click, left-click, or press a key.
```JS
<button @click.right="increment">Right mouse click</button>
<button @click.middle="increment">Click the mouse in the middle.</button>
<button @click.ctrl="increment">Click Ctrl together with left mouse click.</button>
```

</details>

<details>
<summary><h2>Component</h2></summary>

- import and use component
```JS
<template>
    <ListData />
</template>
<script>  
import ListData from "./componenst/HelloWorld.vue";
export default {
  name: 'App',
  components:{
    ListData // import component
  }
}
</script> 
```


</details>


---


## Extensions in VSCode
- vetur
- ESLint