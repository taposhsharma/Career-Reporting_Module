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
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
        ref="filterBoxBtn"
      >
        Filter
      </button>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <filterComponent @filters="applyFilters"></filterComponent>
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
      :per-page="perPage"
      align="center"
      size="md"
      @input="handlePageChange"
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
      // totalItems: 20, // Total number of items
      perPage: 10, // Number of items per page
      searchedText: "",
    };
  },
  computed: {
    totalItems() {
      return this.applicants.length;
    },
  },
  methods: {
    handlePageChange(newPage) {
      // Update your data or fetch new data based on the newPage value
      // For example, you can make an API request here to fetch the data for the new page
      this.$router.push({
        path: "/",
        query: { page: newPage, limit: 20 },
      });
      console.log("Page changed to:", newPage);
    },

    applyFilters(filterOpts) {
      console.log(filterOpts);
      const url = "http://localhost:5000/data/filterData";
      axios
        .post(url, filterOpts)
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
      this.$refs.filterBoxBtn.click();
    },

    search() {
      console.log(this.searchedText);
      const text = [this.searchedText];
      console.log(typeof text);
      const url = "http://localhost:5000/data/search";
      axios
        .post(url, text)
        .then((response) => {
          console.log(response);
          this.applicants = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const url = "http://localhost:5000/data/allData";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.rows);
        this.applicants = [...response.data.rows];
        console.log(this.applicants.length);
      })
      .catch((error) => console.log("Error-", error));
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
table {
  margin: 0 auto;
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