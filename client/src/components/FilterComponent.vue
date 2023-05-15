<template>
  <div class="filter">
    <ul>
      <!-- <li><button @click="experience = !experience">Experience</button></li> -->
      <li>
      <div class="div">
        <label id="experience">Experience:</label> &nbsp; 
        <div class="experience">     
          <input type="number" v-model="rangeExperience[0]">&nbsp;
          <input type="number" v-model="rangeExperience[1]">
          </div>
        </div>
        <br>
      <vue-slider v-model="rangeExperience" :min="0" :max="100"></vue-slider>
      </li>
      <!-- <li><button @click="position = !position">Position</button></li> -->
      <!-- <div v-if="position" class="div">
          <label for="position">Position:</label>
          <select v-model="selectedTech" multiple size="4">
            <option v-for="option in Array.from(new Set(this.posOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div> -->
        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
    Position
  </button>
  <div class="dropdown-menu">
    <select v-model="selectedTech" multiple size="4">
            <option v-for="option in Array.from(new Set(this.posOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
  </div>
</div>
<br>
      <li><button @click="gender = !gender">Gender</button></li>
      <div v-if="gender" class="div">
          <label for="gender">Gender:</label>
          <select id="gender">
            <option v-for="option in Array.from(new Set(this.genderOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>

      <li>
      <div class="div" >
        <label id="age">Age:</label>&nbsp;
        <div class="experience">
          <input type="number" id="min-age" v-model="rangeAge[0]">&nbsp;
          <input type="number" id="max-age" v-model="rangeAge[1]">
        </div>
        <br>
      </div>
      </li>
      <vue-slider v-model="rangeAge" :min="0" :max="100"></vue-slider>
      
      <li><button @click="location = !location">Location</button></li>
      <div v-if="location" class="div">
          <!-- <label for="location">Location:</label> -->
          <select v-model="selectedLoc" multiple size="2">
            <option v-for="option in Array.from(new Set(this.locOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
    </ul>
      <button class="filButton">Filter</button>
      <!-- <button class="filButton" @click="open = false">Close</button> -->
      <button class="filButton" @click="closeFilters()">Close</button>
  </div>

</template>

<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
export default {
  name: "FilterComponent",
  components:{
    VueSlider
  },
  data() {
    return {
      rangeExperience: [25, 75],
      rangeAge: [25, 75],
      experience: false,
      age: false,
      position: false,
      gender: false,
      location: false,
      data: [],
      posOptions: [],

      experienceOptions: [1,2,3,4,5,6,7,8],
      ageOptions: ["20-30", "30-40", "40-50", "50-60"],
      genderOptions: [],
      locOptions: [],
      selectedLoc: [],
      selectedTech: [],
    };
  },
  emits: ['close'],
  methods: {
    closeFilters(){
        this.$emit('close')
    }
  },
  mounted(){
    axios.get('http://localhost:5000/data/alldata')
    .then(res => {
        console.log(res.data.rows);
        this.data = res.data.rows;
        for(let i=0;i < this.data.length; i++){
            this.posOptions.push(this.data[i].position)
            this.genderOptions.push(this.data[i].gender)
            this.locOptions.push(this.data[i].city)
        }
        })
  }
};
</script>

<style scoped>
.filter {
  margin: auto;
  width: 100%;
  background-color: #f5f5f5;
  /* width: 200px; */
  box-shadow: 0px 2px 4px #888;
  /* position: fixed; */
  top: 60px;
  padding: 20px;
  text-align: center;
  user-select: none;
}

.filter ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter li {
  margin-bottom: 10px;
}

.div {
  display: flex;
  /* align-content: center; */
  /* width: 200px; */
  margin-bottom: 10px;
}
.experience{
  right: 0px;
}

input {
  width: 50px;
}

.filButton{
    background-color: grey;
    cursor: pointer;
}

</style>