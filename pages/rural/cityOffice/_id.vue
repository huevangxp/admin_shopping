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
        <v-btn color="primary" @click="dialog = true">ສ້າງຫ້ອງເມືອງ</v-btn>
        <!-- <v-btn color="green" dark>Export To excel</v-btn> -->
      </v-col>
    </v-row>
    <!-- {{ id }} -->
    <v-data-table
      :headers="dessertHeaders"
      :items="office"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      @click:row="moveToCityOffice"
    >
      <!-- show-expand -->
      <!-- v-if="role !== 'super_admin'" -->
      <template #[`item.idx`]="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="red"
                dark
                v-on="on"
                @click.stop="deleteData(item.id)"
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

      <template v-slot:item.employee="{ item }">
        <div class="d-flex">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="success"
                  dark
                  v-on="on"
                  @click.stop="openEmployee(item.id)"
                >
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>ເບີ່ງພະນັກງານ</span>
            </v-tooltip>
            <v-tooltip bottom v-if="role === 'rural_admin'">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="green"
                  dark
                  v-on="on"
                  @click.stop="openCreateEmployee(item.id)"
                >
                  <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
              </template>
              <span>ສ້າງພະນັກງານ</span>
            </v-tooltip>
          </div>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງຊື່ຫ້ອງເມືອງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ຫ້ອງການເມືອງ</p>
          <v-text-field
            v-model="title"
            label="ຊື່ຫ້ອງການເມືອງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createOffice()"
            >ສ້າງຫ້ອງການ</v-btn
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
      title: "",
      singleExpand: false,
      dialog: false,
      search: "",
      office:[],
      role: this.$cookies.get("role"),
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ຫ້ອງການ", value: "office_title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
      ],
    };
  },
  mounted() { 
    this.seleteData();
  },

  methods: {
    openCreateEmployee(id) {
      this.$router.push(`/rural/cityOffice/create/${id}`)
    },
    seleteData() {
      try {
        this.$axios.get(`/office/${this.id}`)
      .then((res) => {
        console.log(res.data);
      this.office = res?.data
    })
      } catch (error) {
        console.log(error);
      }
    },
   async deleteData(id) {
      try {
        // console.log(id);
       await this.$axios.delete(`/office/${id}`)
          .then((data) => {
          // console.log(data);
          this.$toast.success("ລຶບຂໍ້ມູນສຳເລັດ")
          })
        this.seleteData();
      } catch (error) {
        console.log(error);
      }
    },
   async createOffice() {
      const data = {
        district_id: this.id,
        title:this.title
      }
      // console.log(data);
    await  this.$axios.post('/office', data)
        .then((res) => {
          // console.log(res.data);
          this.$toast.success('ສ້າງສຳເລັດ')
        this.dialog = false
        })

     this.seleteData();
      
    },
    moveToCityOffice(item) {
      this.$router.push(`/rural/cityUnit/${item.id}`);
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
