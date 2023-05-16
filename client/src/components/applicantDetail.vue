<template>
  <div class="main">
    <!-- <div class="nav">
      <h2>APPLICANTS' LIST</h2>
    </div> -->
    <nav class="navbar sticky-top navbar-dark bg-dark">
  <a class="navbar-brand">Applicants' List</a>
</nav>
    <div class="filterBox" v-show="filterBox">
      <filterComponent @close="closeFilters()"></filterComponent>
    </div>
    <div class="operations">
      <!-- <input type="text" />
      <button>Search</button> -->
      <!-- <button @click="openFilters">Filters</button> -->
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Filter
      </button>
    </div>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <filterComponent />
        </div>
      </div>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
          <th scope="col">Position</th>
          <th scope="col">Exprience</th>
          <th scope="col">Relevant Experience</th>
          <th scope="col">Application Status</th>
          <th scope="col">Email</th>
          <th scope="col">Mobile</th>
          <th scope="col">DOB</th>
    </tr>
  </thead>
  <tbody>
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
    
  </tbody>
</table>

    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
  </div>
</template>

<script>
import axios from "axios";
import filterComponent from "./FilterComponent.vue";
export default {
  name: "applicantDetail",
  data() {
    return {
      filterBox: false,
      applicants: [],
    };
  },
  components: {
    filterComponent,
  },
  methods: {
    openFilters() {
      this.filterBox = !this.filterBox;
    },
    closeFilters() {
      this.filterBox = !this.filterBox;
    },
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
  margin: 8px auto;
  display: flex;
  width: 55%;
}
.operations input {
  width: 55%;
}
table {
  margin: 0 auto;
}
th {
  color: #903564;
}
/* table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
} */
.card{
  margin: auto;
  width: 55%;
}
.filterBox {
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search-bar {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search-bar input[type="text"] {
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px 10px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-bar input[type="text"]:focus {
  outline: none;
  border-color: #6c757d;
}

.search-bar button {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-bar button:hover {
  background-color: #495057;
}

</style>