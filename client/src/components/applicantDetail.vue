<template>
  <div class="main">
    <div class="nav">
      <h2>APPLICANTS' LIST</h2>
    </div>
    <div class="filterBox" v-show="filterBox"><filterComponent @close="closeFilters()"></filterComponent></div>
    <div class="operations">
      <input type="text" />
      <button>Search</button>
      <button @click="openFilters">Filters</button>
    </div>
    <div class="details">
      <table>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Exprience</th>
          <th>Relevant Experience</th>
          <th>Application Status</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>DOB</th>
        </tr>
        <tr v-for="applicant in applicants" :key="applicant.id">
          <td>{{ applicant.first_name }} {{ applicant.last_name }}</td>
          <td>{{ applicant.position }}</td>
          <td>{{ applicant.experience }}</td>
          <td>{{ applicant.relevant_experience }}</td>
          <td>{{ applicant.status }}</td>
          <td>{{ applicant.email }}</td>
          <td>{{ applicant.mobile_no }}</td>
          <td>{{ applicant.dob }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import filterComponent from './FilterComponent.vue'
export default {
  name: "applicantDetail",
  data() {
    return {
      filterBox: false,
      applicants: [],
    };
  },
  components:{
    filterComponent,
  },
  methods: {
    openFilters() {
      this.filterBox = !this.filterBox;
    },
    closeFilters(){
      this.filterBox = !this.filterBox
    }
  },
  mounted() {
    const url = "http://localhost:5000/data/allData";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.rows);
        this.applicants = [...response.data.rows];
      })
      .catch((error) => console.log("Error-", error));
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #903564;
  border-bottom: 1px solid black;
}
.operations {
  margin: 8px;
}
.operations input{
  width: 55%;
}
table {
  margin: 0 auto;
}
th {
  color: #903564;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.filterBox{
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>