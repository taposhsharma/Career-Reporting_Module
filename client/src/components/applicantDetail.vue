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
    <table class="table table-striped" v-if="applicants.length != 0">
      <thead>
        <tr>
          <!-- <th v-for="heading in headings" :key="heading">
            <div class="h4 mb-0">
              <b-icon icon="arrow-up" @click="sortAsc(heading)" :style="{ boxShadow: getBoxShadow(heading, 'asc') }"></b-icon>
              <b-icon icon="arrow-down" @click="sortDes(heading)" :style="{ boxShadow: getBoxShadow(heading, 'desc') }"></b-icon>
            </div>
          </th> -->
          <th v-for="column in columns" :key="column">
            <div class="h4 mb-0">
              <b-icon
                icon="arrow-up"
                @click="sortAs(column, 'asc')"
                :style="{ boxShadow: getBoxShadow(column, 'asc') }"
              ></b-icon>
              <b-icon
                icon="arrow-down"
                @click="sortAs(column, 'desc')"
                :style="{ boxShadow: getBoxShadow(column, 'desc') }"
              ></b-icon>
            </div>
          </th>
          <!-- <th v-for="column in columns" :key="column">
            <div class="h4 mb-0">
              <b-icon icon="arrow-up" @click="sortAs(column, 'asc')"></b-icon>
              <b-icon icon="arrow-down" @click="sortAs(column, 'desc')"></b-icon>
            </div>
          </th> -->
        </tr>
        <tr>
          <th
            v-for="heading in headings"
            :key="heading"
            scope="col"
            :class="{ sorted: sortColumn === heading }"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="applicant in applicants" :key="applicant.id">
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
    <div v-else>
      <h2>No data found</h2>
       
    </div>
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="perPage"
      align="center"
      size="md"
    ></b-pagination> -->
    <ul class="pagination b-pagination pagination-md justify-content-center">
      <li class="page-item">
        <span class="page-link" @click="prevPage()">Prev</span>
      </li>
      <li class="page-item active">
        <button class="page-link disabled">{{ currentPage }}</button>
      </li>
      <li class="page-item">
        <span class="page-link" @click="nextPage()">Next</span>
      </li>
    </ul>

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
      sortColumn: "",
      sortDirection: "",
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
        "dob",
      ],
      sortCol: "",
      sortOrder: "",
    };
  },
  // computed: {
  //   totalItems() {
  //     return this.applicants.length;
  //   },
  //   computedApplicants() {
  //     if (!this.applicants) return [];
  //     else {
  //       const firstIndex = (this.currentPage - 1) * this.perPage;
  //       const lastIndex = this.currentPage * this.perPage;

  //       return this.applicants.slice(firstIndex, lastIndex);
  //     }
  //   },
  // },
  methods: {
    callData() {
      const url = `http://localhost:5000/data/filterData?limit=${this.perPage}&page=${this.currentPage}&sortCol=${this.sortCol}&order=${this.sortOrder}`;
      axios
        .post(url, this.filterParams)
        .then((response) => {
          console.log(response.data);
          this.applicants = response.data;
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBoxShadow(col, order) {
      if (col === this.sortCol && order === this.sortOrder) {
        return "0 2px 4px rgba(0, 0, 0, 0.8)"; // Selected heading with the corresponding sorting direction
      } else {
        return ""; // Empty string for other headings
      }
    },
    sortAs(column, order) {
      if (column === this.sortCol && order === this.sortOrder) {
        this.sortCol = "";
        this.sortOrder = "";
      } else {
        this.sortCol = column;
        this.sortOrder = order;
      }
      this.callData();
    },
    applyFilters(filterOpts) {
      console.log(filterOpts);
      this.currentPage = 1;
      this.filterParams = [...filterOpts];
      console.log("2", this.filterParams);
      this.callData();
      this.$refs.filterBoxBtn.click();
    },
    changePerPage(pageLimit) {
      this.perPage = pageLimit;
      this.callData();
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
    prevPage() {
      if (this.currentPage !== 1) {
        this.currentPage--;
        this.callData();
      }
    },
    nextPage() {
      this.currentPage++;
      this.callData();
    },
  },
  mounted() {
    this.perPage = 50;
    this.currentPage = 1;
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
    this.callData();
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
.b-icon {
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
th.sorted {
  background-color: yellow;
}
.box-shadow-up {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Box shadow style for ascending sorting */
}

.box-shadow-down {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Box shadow style for descending sorting */
}
</style>