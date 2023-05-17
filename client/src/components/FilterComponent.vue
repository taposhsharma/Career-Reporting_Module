<template>
  <div>
    <div class="row m-1">
      <div class="col-4">Position</div>
      <div class="col-8 dropdown">
        <button
          class="btn btn-outline-info dropdown-toggle w-100 text-wrap"
          type="button"
          @click="toggleDropdownPos"
          aria-haspopup="true"
          aria-expanded="isDropdownOpenPos"
        >
          {{ selectedPos.length != 0 ? selectedPos.join(", ") : "Position" }}
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
    <div class="row m-1">
      <div class="col-4">Location</div>
      <div class="col-8 dropdown">
        <button
          class="btn btn-outline-info dropdown-toggle w-100 text-wrap"
          type="button"
          @click="toggleDropdownLoc"
          aria-haspopup="true"
          aria-expanded="isDropdownOpenLoc"
        >
          {{ selectedLoc.length != 0 ? selectedLoc.join(", ") : "Location" }}
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
    <div class="row m-1">
      <div class="col-4">Interview Results</div>
      <div class="col-8 dropdown">
        <button
          class="btn btn-outline-info dropdown-toggle w-100 text-wrap"
          type="button"
          @click="toggleDropdownRes"
          aria-haspopup="true"
          aria-expanded="isDropdownOpenRes"
        >
          {{ selectedRes.length != 0 ? selectedRes.join(", ") : "Interview Results" }}
        </button>
        <div class="dropdown-menu" :class="{ show: isDropdownOpenRes }">
          <a
            v-for="item in Array.from(new Set(this.resOptions))"
            :key="item"
            class="dropdown-item"
            @click="toggleItemRes(item)"
          >
            {{ item }}
          </a>
        </div>
      </div>
    </div>
    <div class="row m-1">
      <div class="col-4">Gender</div>
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selectedGen"
        name="flavour-2"
        class="col-8"
      >
        <b-form-checkbox value="Male">Male</b-form-checkbox>
        <b-form-checkbox value="Female">Female</b-form-checkbox>
      </b-form-checkbox-group>
    </div>
    <div class="row m-1">
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
    <div class="row m-1">
      <div class="col-4">Age</div>
      <div class="col-8 d-flex align-items-center">
        <input type="number" min="18" max="75" v-model="rangeAge[0]" />
        <vue-slider
          v-model="rangeAge"
          :min="18"
          :max="75"
          class="w-100 ml-3 mr-3"
        ></vue-slider>
        <input type="number" min="18" max="75" v-model="rangeAge[1]" />
      </div>
    </div>
    <div class="row m-2 d-flex" style="justify-content: space-evenly">
      <button class="col-3 btn btn-danger">Reset</button>
      <button class="col-3 btn btn-primary">Filter</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "FilterComponent",
  components: {
    VueSlider,
  },
  data() {
    return {
      rangeExperience: [0, 15],
      rangeAge: [18, 75],
      posOptions: [],
      genderOptions: [],
      locOptions: [],
      resOptions: [],
      
      // experience: false,
      // age: false,
      // position: false,
      // gender: false,
      // location: false,
      data: [],
    
      selectedPos: [],
      selectedLoc: [],
      selectedRes: [],
      selectedGen: [],

      isDropdownOpenPos: false,
      isDropdownOpenLoc: false,
      isDropdownOpenRes: false,

      
      
    };
  },
  methods: {
    toggleDropdownPos() {
      this.isDropdownOpenPos = !this.isDropdownOpenPos;
      this.isDropdownOpenLoc = false
      this.isDropdownOpenRes = false
    },
    toggleDropdownLoc() {
      this.isDropdownOpenLoc = !this.isDropdownOpenLoc;
      this.isDropdownOpenRes = false
      this.isDropdownOpenPos = false
    },
    toggleDropdownRes(){
      this.isDropdownOpenRes =! this.isDropdownOpenRes;
      this.isDropdownOpenPos = false
      this.isDropdownOpenLoc = false
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
    toggleItemRes(item) {
      if (this.selectedRes.includes(item)) {
        this.selectedRes = this.selectedRes.filter((i) => i !== item);
      } else {
        this.selectedRes.push(item);
      }
    },
  },
  mounted() {
    axios.get("http://localhost:5000/data/alldata").then((res) => {
      console.log(res.data.rows);
      this.data = res.data.rows;
      console.log(this.data.length)
      for (let i = 0; i < this.data.length; i++) {
        this.posOptions.push(this.data[i].position);
        this.genderOptions.push(this.data[i].gender);
        this.locOptions.push(this.data[i].city);
        this.resOptions.push(this.data[i].application_status)
      }
    });
  },
};
</script>

<style scoped>
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
.experience {
  right: 0px;
}
input {
  width: 50px;
}
.filButton {
  background-color: grey;
  cursor: pointer;
}
.location {
  height: 100%;
  width: 100%;
}
</style>