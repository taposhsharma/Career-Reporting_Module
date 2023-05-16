<template>
<div>
<div class="filter">
    <div class="row">
      <div class="col-4">Position</div>
      <div class="col-8 dropdown">
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
    </div>
    <br>
    <div class="row">
      <div class="col-4">Location</div>
      <div class="col-8 dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        @click="toggleDropdownLoc"
        aria-haspopup="true"
        aria-expanded="isDropdownOpenLoc"
      >
        Location: {{selectedLoc.length}}
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
    </div>
    <div class="row">
      <div class="col-4">Interview Results</div>
    </div>
    <div class="row">
      <div class="col-4">Gender</div>
    </div>
    <div class="row">
      <div class="col-4">Experience</div>
      <div class="col-8 d-flex align-items-center">
        <input type="number" min="0" max="15" v-model="rangeExperience[0]" />
        <vue-slider
          v-model="rangeExperience"
          :min="0"
          :max="15"
          class="w-100 ml-3 mr-3"
        ></vue-slider>
        <input type="number" min="0" max="15" v-model="rangeExperience[1]" />
      </div>
    </div>
    <div class="row">
      <div class="col-4">Age</div>
      <div class="col-8 d-flex align-items-center">
        <input type="number" min="18" max="75" v-model="rangeAge[0]" />
        <vue-slider
          v-model="rangeAge"
          :min="18"
          :max="75"
          class="w-100 ml-3 mr-3"
        ></vue-slider>
        <input type="number" min="0" max="15" v-model="rangeAge[1]" />
      </div>
    </div>
    <button class="filButton">Filter</button>
      <button class="filButton" @click="closeFilters()">Close</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
export default {
  name: "FilterComponent",
  components:{
    VueSlider,
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
      genderOptions: [],
      locOptions: [],
      selectedLoc: [],
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