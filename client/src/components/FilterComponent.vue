<template>
  <div>
    <!-- <div class="row m-1">
      <div class="col-4">Position</div>
      <div class="col-8 dropdown" id="dropdown-checkbox">
        <button
          class="btn btn-outline-info dropdown-toggle w-100 text-wrap"
          type="button"
          @click="toggleDropdownPos"
          aria-haspopup="true"
          :aria-expanded="isDropdownOpenPos"
        >
          {{ selectedPos.length !== 0 ? selectedPos.join(", ") : "Position" }}
        </button>
        <div class="dropdown-menu" :class="{ show: isDropdownOpenPos }">
          <b-form-checkbox
            v-for="item in Array.from(new Set(this.posOptions))"
            :key="item"
            v-model="selectedPos"
            :value="item"
            class="dropdown-item"
          >
            {{ item }}
          </b-form-checkbox>
        </div>
      </div>
    </div> -->
    <div class="row m-1">
      <div class="col-4">Position</div>
      <div class="col-8">
        <multiselect
          v-model="selectedPos"
          placeholder="Search or add a position"
          :options="Array.from(new Set(this.posOptions))"
          :multiple="true"
          :taggable="true"
          @tag="addPosition"
          :close-on-select="false"
        ></multiselect>
      </div>
    </div>
    <!-- <div class="row m-1">
      <div class="col-4">Location</div>
      <div class="col-8 dropdown" id="dropdown-checkbox">
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
          <b-form-checkbox
            v-for="item in Array.from(new Set(this.locOptions))"
            :key="item"
            class="dropdown-item"
            v-model="selectedLoc"
            :value="item"
          >
            {{ item }}
          </b-form-checkbox>
        </div>
      </div>
    </div> -->
    <div class="row m-1">
      <div class="col-4">Location</div>
      <div class="col-8">
        <multiselect
          v-model="selectedLoc"
          placeholder="Search or add a city"
          :options="Array.from(new Set(this.locOptions))"
          :multiple="true"
          :taggable="true"
          @tag="addLocation"
          :close-on-select="false"
        ></multiselect>
      </div>
    </div>
    <!-- <div class="row m-1">
      <div class="col-4">Application Status</div>
      <div class="col-8 dropdown" id="dropdown-checkbox">
        <button
          class="btn btn-outline-info dropdown-toggle w-100 text-wrap"
          type="button"
          @click="toggleDropdownStatus"
          aria-haspopup="true"
          aria-expanded="isDropdownOpenStatus"
        >
          {{
            selectedStatus.length != 0
              ? selectedStatus.join(", ")
              : "Application Status"
          }}
        </button>
        <div class="dropdown-menu" :class="{ show: isDropdownOpenStatus }">
          <b-form-checkbox
            v-for="item in Array.from(new Set(this.statusOptions))"
            :key="item"
            class="dropdown-item"
            v-model="selectedStatus"
            :value="item"
          >
            {{ item }}
          </b-form-checkbox>
        </div>
      </div>
    </div> -->
    <div class="row m-1">
      <div class="col-4">Application Status</div>
      <div class="col-8">
        <multiselect
          v-model="selectedStatus"
          placeholder="Search or add a status"
          :options="Array.from(new Set(this.statusOptions))"
          :multiple="true"
          :taggable="true"
          @tag="addStatus"
          :close-on-select="false"
        ></multiselect>
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
        <b-form-checkbox value="Other">Other</b-form-checkbox>
      </b-form-checkbox-group>
    </div>
    <div class="row m-1">
      <div class="col-4">Experience</div>
      <div class="col-8 d-flex align-items-center">
        <input type="number" min="0" max="15" v-model="rangeExperience[0]" />
        <vue-slider
          v-model="rangeExperience"
          :min="0"
          :max="45"
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
      <button class="col-3 btn btn-danger" @click="resetFilters()">
        Reset
      </button>
      <button class="col-3 btn btn-primary" @click="filterData()">
        Filter
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import Multiselect from "vue-multiselect";
export default {
  name: "FilterComponent",
  components: {
    VueSlider,
    Multiselect,
  },
  data() {
    return {
      rangeExperience: [0, 45],
      rangeAge: [18, 75],
      posOptions: [],
      genderOptions: [],
      locOptions: [],
      statusOptions: [],

      data: [],

      selectedPos: [],
      selectedLoc: [],
      selectedStatus: [],
      selectedGen: [],

      isDropdownOpenPos: false,
      isDropdownOpenLoc: false,
      isDropdownOpenStatus: false,
    };
  },
  emits: ["filters"],
  methods: {
    toggleDropdownPos() {
      this.isDropdownOpenPos = !this.isDropdownOpenPos;
      this.isDropdownOpenLoc = false;
      this.isDropdownOpenStatus = false;
    },
    toggleDropdownLoc() {
      this.isDropdownOpenLoc = !this.isDropdownOpenLoc;
      this.isDropdownOpenStatus = false;
      this.isDropdownOpenPos = false;
    },
    toggleDropdownStatus() {
      this.isDropdownOpenStatus = !this.isDropdownOpenStatus;
      this.isDropdownOpenPos = false;
      this.isDropdownOpenLoc = false;
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
    toggleItemStatus(item) {
      if (this.selectedStatus.includes(item)) {
        this.selectedStatus = this.selectedStatus.filter((i) => i !== item);
      } else {
        this.selectedStatus.push(item);
      }
    },
    // addTag(newTag) {
    //   if (this.posOptions.includes(newTag)) this.selectedPos.push(newTag);
    // },
    addPosition(tag) {
      this.selectedPos.push(tag);
      this.posOptions.push(tag);
    },
    addLocation(tag) {
      this.selectedLoc.push(tag);
      this.locOptions.push(tag);
    },
    addStatus(tag) {
      this.selectedStatus.push(tag);
      this.statusOptions.push(tag);
    },
    resetFilters() {
      this.rangeExperience = [0, 45];
      this.rangeAge = [18, 75];
      this.selectedPos = [];
      this.selectedLoc = [];
      this.selectedStatus = [];
      this.selectedGen = [];
      this.isDropdownOpenLoc = false;
      this.isDropdownOpenPos = false;
      this.isDropdownOpenStatus = false;
    },
    filterData() {
      const filterOpts = [];
      if (this.selectedPos.length) {
        filterOpts.push({
          operator: "IN",
          column: "position",
          params: this.selectedPos,
        });
      }
      if (this.selectedLoc.length) {
        filterOpts.push({
          operator: "IN",
          column: "city",
          params: this.selectedLoc,
        });
      }
      if (this.selectedStatus.length) {
        filterOpts.push({
          operator: "IN",
          column: "application_status",
          params: this.selectedStatus,
        });
      }
      if (this.selectedGen.length) {
        filterOpts.push({
          operator: "IN",
          column: "gender",
          params: this.selectedGen,
        });
      }
      if (!(this.rangeExperience[0] == 0 && this.rangeExperience[1] == 45)) {
        filterOpts.push({
          operator: "BETWEEN",
          column: "experience",
          params: {
            min: this.rangeExperience[0],
            max: this.rangeExperience[1],
          },
        });
      }
      if (!(this.rangeAge[0] == 18 && this.rangeAge[1] == 75)) {
        filterOpts.push({
          operator: "BETWEEN",
          column: "dob",
          params: { min: this.rangeAge[0], max: this.rangeAge[1] },
        });
      }
      console.log("filter options", filterOpts);

      this.$emit("filters", filterOpts);
    },
  },
  mounted() {
    axios.get("http://localhost:5000/data/alldata").then((res) => {
      this.data = res.data.rows;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].position != null)
          this.posOptions.push(this.data[i].position);
        if (this.data[i].gender != null)
          this.genderOptions.push(this.data[i].gender);
        if (this.data[i].city != null) this.locOptions.push(this.data[i].city);
        if (this.data[i].application_status != null)
          this.statusOptions.push(this.data[i].application_status);
      }
    });
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.filter ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter li {
  margin-bottom: 10px;
}
.dropdown-item {
  padding-left: 28px;
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
.col-4 {
  padding: 8px 15px;
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