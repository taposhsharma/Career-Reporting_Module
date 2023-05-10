<template>
  <div class="filter">
    <ul>
      <li><button @click="experience = !experience">Experience</button></li>
      <div v-if="experience" class="div">
        <div>
          <label for="min-experience">Min Experience:</label>
          <select id="experience">
            <option v-for="option in experienceOptions" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <label for="max-experience">Max Experience:</label>
          <select id="experience">
            <option v-for="option in experienceOptions" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <br>
      </div>
      
      <li><button @click="position = !position">Position</button></li>
      <div v-if="position" class="div">
          <!-- <label for="position">Position:</label> -->
          <select v-model="selectedTech" multiple size="4">
            <option v-for="option in Array.from(new Set(this.posOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>

      <li><button @click="gender = !gender">Gender</button></li>
      <div v-if="gender" class="div">
          <label for="gender">Gender:</label>
          <select id="gender">
            <option v-for="option in Array.from(new Set(this.genderOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>

      <li><button @click="age = !age">Age</button></li>
      <div v-if="age" class="div" >
        <div>
          <label for="min-age">Min age:</label>
          <select id="age">
            <option v-for="option in ageOptions" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <label for="max-age">Max Age:</label>
          <select id="age">
            <option v-for="option in ageOptions" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
        <br>
      </div>
      
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
export default {
  name: "FilterComponent",
  data() {
    return {
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
  width: 200px;
  margin-bottom: 10px;
}

input {
  width: 50px;
}

.filButton{
    background-color: grey;
    cursor: pointer;
}
</style>