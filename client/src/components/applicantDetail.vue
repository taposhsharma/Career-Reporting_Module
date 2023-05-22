<template>
  <div class="main">
    <nav class="navbar sticky-top navbar-dark bg-dark">
      <a class="navbar-brand">Applicants' List</a>
    </nav>

    <div class="operations">
      <div class="search-filter">
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
          View per Page: {{ perPage }}
        </span>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="changePerPage(50)"
            >50</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="changePerPage(100)"
            >100</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="changePerPage(150)"
            >150</span
          >
          <span
            class="dropdown-item font-weight-bold text-center"
            @click="changePerPage(200)"
            >200</span
          >
        </div>
      </div>
    </div>
    <div class="collapse" id="collapseFilters">
      <div class="card card-body">
        <filterComponent @filters="applyFilters"></filterComponent>
      </div>
    </div>
    <!-- <div class="text-right p-3">
      
    </div> -->
    <table class="table table-striped" v-if="computedApplicants.length != 0">
      <thead>
        <tr>
          <!-- <th v-for="heading in headings" :key="heading">
            <div class="h4 mb-0">
              <b-icon icon="arrow-up" @click="sortAsc(heading)"></b-icon>
              <b-icon icon="arrow-down" @click="sortDes(heading)"></b-icon>
            </div>
          </th> -->
          <th v-for="column in columns" :key="column">
            <div class="h4 mb-0">
              <b-icon icon="arrow-up" @click="sortAs(column, 'asc')"></b-icon>
              <b-icon icon="arrow-down" @click="sortAs(column, 'desc')"></b-icon>
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="heading in headings" :key="heading" scope="col">
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="applicant in computedApplicants" :key="applicant.id">
          <td>{{ applicant.first_name }} {{ applicant.last_name }}</td>
          <td>{{ applicant.position }}</td>
          <td>{{ applicant.experience }}</td>
          <td>{{ applicant.relevant_experience }}</td>
          <td>{{ applicant.gender }}</td>
          <td>{{ applicant.city }}</td>
          <td>{{ applicant.application_status }}</td>
          <td>{{ applicant.email }}</td>
          <td>{{ applicant.mobile_no }}</td>
          <td>{{ applicant.dob }}</td>
        </tr>
      </tbody>
    </table>
    <h2 v-else>No data found</h2>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="perPage"
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
      perPage: 50,
      searchedText: "",
      filterParams: [],
      headings: [
        "Name",
        "Position",
        "Experience",
        "Relevant Experience",
        "Gender",
        "Location",
        "Application Status",
        "Email",
        "Mobile",
        "DOB",
      ],
      columns: [
        "first_name, last_name",
        "position",
        "experience",
        "relevant_experience",
        "gender",
        "city",
        "application_status",
        "email",
        "mobile_no",
        "dob"
      ],
      sortCol: '',
      sortOrder: ''
    };
  },
  computed: {
    totalItems() {
      return this.applicants.length;
    },
    computedApplicants() {
      if (!this.applicants) return [];
      else {
        const firstIndex = (this.currentPage - 1) * this.perPage;
        const lastIndex = this.currentPage * this.perPage;

        return this.applicants.slice(firstIndex, lastIndex);
      }
    },
  },
  methods: {
    callData(){
      const url = `http://localhost:5000/data/filterData?limit=${this.perPage}&page=${this.currentPage}&sortCol=${this.sortCol}&order=${this.sortOrder}`
      axios
        .post(url,this.filterParams)
        .then((response) => {
          console.log(response.data);
          this.applicants = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sortAs(column, order){
      this.sortCol = column,
      this.sortOrder = order,
      this.callData()
    },
    applyFilters(filterOpts) {
      console.log(filterOpts);
      this.currentPage = 1
      this.filterParams = [...filterOpts]
      console.log("2",this.filterParams)
      this.callData()
      this.$refs.filterBoxBtn.click();
    },
    changePerPage(pageLimit){
      this.perPage = pageLimit
      this.callData()
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
    // sortAsc(heading) {
    //   axios
    //     .post("http://localhost:5000/data/sort", { heading, order: "asc" })
    //     .then((res) => (this.applicants = res.data))
    //     .catch((err) => console.log(err));
    // },
    // sortDes(heading) {
    //   axios
    //     .post("http://localhost:5000/data/sort", { heading, order: "desc" })
    //     .then((res) => (this.applicants = res.data))
    //     .catch((err) => console.log(err));
    // },
  },
  mounted() {
    this.perPage = 50
    this.currentPage = 1
    // const url = `http://localhost:5000/data/filterData?limit=${this.perPage}&page=${this.currentPage}`;
    // axios
    //   .post(url, [])
    //   .then((response) => {
    //     if (response.status == 200) {
    //       console.log(response.data);
    //       this.applicants = response.data;
    //     } else {
    //       console.log("error");
    //       console.log(response.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.callData()
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
  justify-content: space-between;
  width: 100%;
}
.operations input {
  width: 50%;
}
.search-filter {
  display: flex;
  width: 50%;
  margin-left: 335px;
  margin-right: auto;
}
.dropdown.show {
  margin-left: auto;
}
.b-icon{
  cursor: pointer;
}
.table {
  margin: 0;
  width: 100%;
  /* height: 300px; */
  /* overflow: auto; */
}
th {
  color: #903564;
}
.card {
  margin: auto;
  width: 50%;
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