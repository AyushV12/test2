<template>
  <div class="hello">
    <div class="header card shadow ">Prime Number Generator</div>
    <div class="container">
      <div class="inputRange card shadow">
        <div class="startRange">
          <label for="inputStartRange">Enter Start Value of Range</label>
          <b-input  v-model="start" id="inputStartRange" placeholder="Enter Value"></b-input>
        </div>
        <div class="endRange">
          <label for="inputEndRange">Enter End Value of Range</label>
  
          <b-label for="inputEndRange"> </b-label>
          <b-input v-model="end" id="inputEndRange" placeholder="Enter Value"></b-input>
        </div>
      </div>
      <div class="algorithmsContainer card shadow">
        <div class="algorithmOne">
          <b-button v-on:click="setAlgoAsOne"> ALgorithm 1</b-button>
  
  
  
        </div>
        <div class="algorithmTwo">
          <b-button v-on:click="setAlgoAsTwo">  ALgorithm 2</b-button>
  
  
        </div>

       
      </div>
    </div>
    {{response}}
    
    <div class="container1">
      <div class="testGetRequest">
        <b-button v-on:click="getRequest" class="getHistory">Refresh Table</b-button>
      </div>
      <div class="tableContainer">
      <b-table :items="historyArray" :fields="fields" striped hover>

      </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from "axios"
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



export default {
  data(){
    return(
      {
        start:0,
        end:0,
        algo:"one",
        historyArray:[],
        fields:["start","end","AlgorithmChosen",{key:"Date",label:"Date & Time"},{key:"NumberOfPrimesReturned",label:"Number Of Primes"},"TimeElapsed"],
        response:[]
      }
    )
  },
  methods:{
    async getRequest(){
      let res= await axios.get("http://localhost:3001","alpha")
      this.historyArray=res.data
    },
    setAlgoAsOne(){
      this.algo="one"
      this.getPrimeNumbers()
    },
    setAlgoAsTwo(){
      this.algo="two"
      this.getPrimeNumbers()
    },
    async getPrimeNumbers(){

      let res= await axios.post("http://localhost:3001",{"start":this.start,"end":this.end,"algo":this.algo})
      // res=res.json()
       console.log(res.data,res)

      this.response=res.data
      
      
      // console.log(this.response)
      // console.log(res)
    
  },
},
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  font-size: xx-large;

  height: 100px;
  margin: auto;
  
}
.inputRange{
  margin: 50px;
  width: 25%;
  padding: 15px;
}
label{
  margin-left: auto;
}
.algorithmsContainer{
  width: 50%;
  margin: 50px;
  padding-top: 15px;
}
.container{
  display: flex;
  flex-direction: row;
}
.algorithmOne,.algorithmTwo{
  margin: 10px;
}
.getHistory{
  margin-left: auto;
}
.tableContainer{
  padding: 15px;
}
.container1{
  margin: 10px;
}
</style>
