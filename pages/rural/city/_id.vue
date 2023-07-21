<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="search"
          label="search"
          id="id"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4" class="d-flex justify-content-end">
        <v-btn color="primary" @click="getCity"
          >ສ້າງເມືອງ</v-btn>
        <!-- <v-btn color="green" dark>Export To excel</v-btn> -->
      </v-col>
    </v-row>
    <!-- {{ pid }} -->
    <v-data-table
      :headers="headers"
      :items="getCityData"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      @click:row="moveToCityOffice"
    >

      <template #[`item.idx`]="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.created_at="{item}">
        <div>
          {{ $moment(item.created_at).format("DD/MM/YYYY") }}
        </div>
      </template>
      <!-- <template #[`item.actions`] = "{item}">
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="red"
                dark
                v-on="on"
                @click.stop="deleteCity(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>ລືບ</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                dark
                v-on="on"
                @click="createPhane(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>ແກ້ໄຂຂໍ້ມູນ</span>
          </v-tooltip>
        </div>
      </template>

      <template #item.employee>
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                dark
                v-on="on"
                @click="createPhane(item.id)"
              >
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-btn>
            </template>
            <span>ເບີ່ງ</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                dark
                v-on="on"
                @click="createPhane(item.id)"
              >
                <v-icon>mdi-account-multiple-plus-outline</v-icon>
              </v-btn>
            </template>
            <span>ສ້າງ</span>
          </v-tooltip>

        </div>
      </template> -->
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງເມືອງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ເມືອງ</p>
          <v-select
            v-model="title"
            label="ເລືອກຊື່ເມືອງ"
            :items="city"
            item-text="dn"
            item-value="dn"
            outlined
            dense
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createCity()"
            >ສ້າງເມືອງ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "CityPage",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dialog: false,
      search: "",
      title: "",
      role: this.$cookies.get("role"),
      city: [],
      getCityData:[],
      headers: [
        {
          text: "ລຳດັບ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ພະແນກ", value: "district_title" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        // { text: "", value: "actions" },
        // { text: "", value: "data-table-expand" },
        // { text: "", value: "employee" },
      ],
    };
  },
  mounted() {
    this.$axios.get(`/district/${this.id}`)
      .then((res) => {
    // console.log(res.data);
    this.getCityData = res?.data
   })
  },
  methods: {
   async deleteCity(id) {

    try {
       await this.$axios.delete(`/district/${id}`)
        .then((res) => {
          // console.log(res.data);
        
        })
      this.$axios.get(`/district/${this.id}`)
      .then((res) => {
    console.log(res.data);
    this.getCityData = res?.data
   })
    } catch (error) {
      console.log(error);
    }
    },
   async createCity(){
    try {
      const data = {
        province_departments_id: this.id,
        title: this.title
      }
      // console.log(data);
     await this.$axios.post('/district', data)
        .then((res) => {
        this.dialog = false
        })
        this.$axios.get(`/district/${this.id}`)
      .then((res) => {
    // console.log(res.data);
    this.getCityData = res?.data
   })
    } catch (error) {
      console.log(error);
    }
  },
    moveToCityOffice(item) {
      this.$router.push(`/rural/cityOffice/${item.id}`);
    },
   async getCity() {
      let id = this.pid
    await  this.$axios.get(`/address/city/${id}`).then((res) => {
      this.city = res?.data
    });
     this.dialog = true
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    pid() {
      return this.$route.query.pid;
    },
  },
};
</script>
