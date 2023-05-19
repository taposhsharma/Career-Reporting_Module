<template>
  <div class="main">
    <nav class="navbar sticky-top navbar-dark bg-dark">
      <a class="navbar-brand">Applicants' List</a>
    </nav>

    <div class="operations">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="searchedText"
        />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="search()">
            Search
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#collapseFilters"
        aria-expanded="false"
        aria-controls="collapseFilters"
        ref="filterBoxBtn"
      >
        Filter
      </button>
    </div>
    <div class="collapse" id="collapseFilters">
      <div class="card card-body">
        <filterComponent @filters="applyFilters"></filterComponent>
      </div>
    </div>
    <div class="text-right p-3">
      <!-- <b-form-select v-model="limit" class="mb-3 w-25">
      <b-form-select-option :value="50">50</b-form-select-option>
      <b-form-select-option value="a">Option A</b-form-select-option>
      </b-form-select> -->
      <!-- <button class="btn btn-">Page per view: {{limit}}</button> -->

      <div class="dropdown show">
        <span
          class="btn btn-primary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          View per Page: {{ limit }}
        </span>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="pageLimit(50)"
            >50</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="pageLimit(100)"
            >100</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="pageLimit(150)"
            >150</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="pageLimit(200)"
            >200</span
          >
        </div>
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
        <tr v-for="applicant in computedApplicants" :key="applicant.id">
          <td>{{ applicant.first_name }} {{ applicant.last_name }}</td>
          <td>{{ applicant.position }}</td>
          <td>{{ applicant.experience }}</td>
          <td>{{ applicant.relevant_experience }}</td>
          <td>{{ applicant.application_status }}</td>
          <td>{{ applicant.email }}</td>
          <td>{{ applicant.mobile_no }}</td>
          <td>{{ applicant.dob }}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="limit"
      align="center"
      size="md"
    ></b-pagination>
  </div>
</template>

<script>
import axios from "axios";
import filterComponent from "./FilterComponent.vue";
export default {
  name: "applicantDetail",
  components: {
    filterComponent,
  },
  data() {
    return {
      applicants: [],
      currentPage: 1,
      limit: 50, // Number of items per page
      total_pages: 0,
      searchedText: "",
    };
  },
  computed: {
    totalItems() {
      return this.applicants.length;
    },
    computedApplicants(){
      if (!this.applicants) return []
      else {
        const firstIndex = (this.currentPage - 1) * this.perPage
        const lastIndex = this.currentPage * this.perPage

        return this.applicants.slice(firstIndex, lastIndex)
    }
  }
  },
  methods: {
    // handlePageChange(newPage) {
    //   // Update your data or fetch new data based on the newPage value
    //   // For example, you can make an API request here to fetch the data for the new page
    //   this.$router.push({
    //     path: "/",
    //     query: { page: newPage, limit: 20 },
    //   });
    //   console.log("Page changed to:", newPage);
    // },
    applyFilters(filterOpts ){
      console.log(filterOpts);
      axios.post('http://localhost:5000/data/filterData', filterOpts)
      .then((response) => {
        console.log(response.data);
        this.applicants = response.data
      })
      .catch((error) => {
        console.log(error);
      })
    }

  },
  mounted() {
    // const url = "http://localhost:5000/data/allData";
    // axios
    //   .get(url)
    //   .then((response) => {
    //     console.log(response.data.rows);
    //     this.applicants = [...response.data.rows];
    //     console.log(this.applicants.length);
    //   })
    //   .catch((error) => console.log("Error-", error));
    this.currentPage = 1;
    this.limit = 50;
    const url = `http://localhost:5000/data/filterData?limit=${this.limit}&page=${this.currentPage} `;
    axios
      .post(url, [])
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.applicants = response.data;
        } else {
          console.log("error");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.collapse {
  margin: 10px;
}
.main {
  user-select: none;
}
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
.table {
  margin: 0 auto;
  /* height: 300px; */
  /* overflow: auto; */
}
th {
  color: #903564;
}

.card {
  margin: auto;
  width: 55%;
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