<template>
  <div class="filter">
      <!-- <li><button @click="experience = !experience">Experience</button></li> -->
      <div class="div">
        <label id="experience">Experience:</label> &nbsp; 
        <div class="experience">     
          <input type="number" v-model="rangeExperience[0]">&nbsp;
          <input type="number" v-model="rangeExperience[1]">
          </div>
        </div>
        <br>
      <vue-slider v-model="rangeExperience" :min="0" :max="100"></vue-slider>
      <!-- <li><button @click="position = !position">Position</button></li> -->
      <!-- <div v-if="position" class="div">
          <label for="position">Position:</label>
          <select v-model="selectedTech" multiple size="4">
            <option v-for="option in Array.from(new Set(this.posOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div> -->
        <!-- <div class="dropdown">
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
</div> -->
<!-- <b-dropdown v-model="selectedPos" toggle-class="btn-primary" no-close-on-select>
      <template v-slot:button-content>
        <span>Selected items: {{ selectedPos.length }}</span>
      </template>
      <b-dropdown-item v-for="item in Array.from(new Set(this.posOptions))" :key="item" @click="toggleItem(item)">
        {{ item }}
      </b-dropdown-item>
    </b-dropdown> -->
    
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        @click="toggleDropdownPos"
        aria-haspopup="true"
        aria-expanded="isDropdownOpenPos"
      >
        Position
      </button>
      <div class="dropdown-menu" :class="{ show: isDropdownOpenPos }">
        <a
          v-for="item in Array.from(new Set(this.posOptions))"
          :key="item"
          class="dropdown-item"
          @click="toggleItemPos(item)"
        >
          {{ item }}
        </a>
      </div>
    </div>
<br>
      <button @click="gender = !gender">Gender</button>
      <div v-if="gender" class="div">
          <label for="gender">Gender:</label>
          <select id="gender">
            <option v-for="option in Array.from(new Set(this.genderOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>

      <div class="div" >
        <label id="age">Age:</label>&nbsp;
        <div class="experience">
          <input type="number" id="min-age" v-model="rangeAge[0]">&nbsp;
          <input type="number" id="max-age" v-model="rangeAge[1]">
        </div>
        <br>
      </div>
      <vue-slider v-model="rangeAge" :min="0" :max="100"></vue-slider>
      
<!-- <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button"  @click="toggleDropdownLoc" aria-expanded="isDropdownOpenLoc">
    Location
  </button>
  <div class="dropdown-menu" :class="{ show: isDropdownOpenLoc }">
          <select v-model="selectedLoc" multiple size="4" class="location">
            <option v-for="option in Array.from(new Set(this.locOptions))" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
</div> -->
<div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        @click="toggleDropdownLoc"
        aria-haspopup="true"
        aria-expanded="isDropdownOpenLoc"
      >
        Location
      </button>
      <div class="dropdown-menu" :class="{ show: isDropdownOpenLoc }">
        <a
          v-for="item in Array.from(new Set(this.locOptions))"
          :key="item"
          class="dropdown-item"
          @click="toggleItemLoc(item)"
        >
          {{ item }}
        </a>
      </div>
    </div>
<br>
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
      selectedPos: [],
      isDropdownOpenPos: false,
      isDropdownOpenLoc: false,

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
    },
    toggleDropdownPos() {
      this.isDropdownOpenPos = !this.isDropdownOpenPos;
    },
    toggleDropdownLoc() {
      this.isDropdownOpenLoc = !this.isDropdownOpenLoc;
    },
    toggleItemPos(item) {
      if (this.selectedPos.includes(item)) {
        this.selectedPos = this.selectedPos.filter((i) => i !== item);
      } else {
        this.selectedPos.push(item);
      }
    },
    toggleItemLoc(item) {
      if (this.selectedLoc.includes(item)) {
        this.selectedLoc = this.selectedLoc.filter((i) => i !== item);
      } else {
        this.selectedLoc.push(item);
      }
    },
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
  /* margin: auto; */
  width: 100%;
  background-color: #f5f5f5;
  /* width: 200px; */
  box-shadow: 0px 2px 4px #888;
  top: 60px;
  padding: 20px;
  /* text-align: center; */
  align-items: center;
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
  margin-left: auto;
  display: flex;
  align-items: center;
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
.location{
  height: 100%;
  width: 100%;
}
</style>