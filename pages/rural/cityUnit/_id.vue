<template>
  <v-container fluid>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງໜ່ວຍງານ</h1>
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
        <v-btn
          v-if="role == 'rural_admin'"
          outlined
          color="primary"
          @click="dialog = true"
          >ສ້າງໜ່ວຍງານ</v-btn
        >
      </v-col>
    </v-row>
    <!-- {{ id }} -->
    <v-data-table
      :headers="dessertHeaders"
      :items="unit"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
    >
      <!-- show-expand -->
      <!-- v-if="role !== 'super_admin'" -->
      <template #[`item.idx`]="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <div v-if="role == 'rural_admin'" class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="red"
                dark
                v-on="on"
                @click="deleteUnit(item.id)"
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
                @click.stop="openUpdate(item)"
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
                  @click.stop="openEmployee(item)"
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
        <v-card-title color="red">ສ້າງຊື່ໜ່ວຍງານ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ໜ່ວຍງານ</p>
          <v-text-field
            v-model="title"
            label="ຊື່ໜ່ວຍງານ"
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
          <v-btn color="primary" dark @click="createOfficeUnit()"
            >ສ້າງໜ່ວຍງານ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title color="red">ໜ່ວຍງານ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ໜ່ວຍງານ</p>
          <v-text-field v-model="unitData.unit_title"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="dialogUpdate = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary" outlined dark @click="updateUnit()"
            >ບັນທືກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show employee -->
    <v-dialog
      v-model="dialogEmployee"
      max-width="500px"
      fullscreen
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar elevation="1">
          <v-avatar class="mx-2" size="40" color="primary" dark>
            <v-icon color="white">mdi-account</v-icon>
          </v-avatar>
          <v-toolbar-title
            >ພະນັກງານຂອງ{{ unitData?.unit_title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <div>
            <v-btn fab elevation="0" @click="dialogEmployee = false">
              <v-icon>mdi-power</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <div class="mt-5 mx-5">
          <v-row>
            <v-col
              v-for="(item, index) in unitGetData?.rows"
              :key="index"
              cols="12"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
                    lazy-src="/loading.gif"
                    :src="item.profile"
                    style="width: 100%; height: 200px; object-fit: contain"
                  ></v-img>
                </v-col>
                <v-col cols="10">
                  <div>
                    <div class="d-flex justify-space-between">
                      <h2>
                        ທ່ານ {{ item.name }} {{ item.last_name }} (
                        {{ item.position }} )
                      </h2>
                      <v-speed-dial
                        v-model="fab"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                      >
                        <template v-slot:activator>
                          <v-btn v-model="fab" color="blue darken-2" icon dark>
                            <v-icon v-if="fab"> mdi-close </v-icon>
                            <v-icon v-else> mdi-dots-vertical </v-icon>
                          </v-btn>
                        </template>
                        <v-btn
                          icon
                          dark
                          small
                          color="red"
                          @click.stop="deleteEm(item.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          dark
                          small
                          color="green"
                          @click.stop="updateEm(item.id)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-speed-dial>
                    </div>

                    <div class="mt-2">
                      <p class="black--text">ເບີໂທ: {{ item.phone }}</p>
                      <p class="black--text">ທີ່ຢູ່: {{ item.address }}</p>
                    </div>
                    <p class="black--text">
                      ປະຫັວດ:
                      {{ item.details }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mt-2"></v-divider>
            </v-col>
          </v-row>
        </div>
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
      dialogEmployee: false,
      dialog: false,
      dialogUpdate: false,
      direction: "bottom",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
      title: "",
      search: "",
      uid:'',
      unitData: {},
      unitGetData:{},
      unit: [],
      role: this.$cookies.get("role"),
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ໜ່ວຍງານ", value: "unit_title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
      ],

      city: [
        {
          id: 159,
          name: "ໜ່ວຍງານ",
        },
      ],
    };
  },
  mounted() {
    this.getUnit();
  },
  methods: {
    openEmployee(item) {
      this.unitData = item;
      console.log(item.id);
      this.dialogEmployee = true;
      this.$axios.get(`/get-unit-all-byId/${item.id}`).then((res) => {
        this.unitGetData = res?.data;
      });
    },
    async  deleteEm(id) {
     await this.$axios.delete(`/delete-unit-member//${id}`)
        .then((res) => {
          this.$toast.success('ສຳເລັດ')
        })
        this.$axios.get(`/get-unit-all-byId/${this.uid}`).then((res) => {
        this.unitGetData = res?.data;
      });
    },
    updateEm(id) {
      this.$router.push(`/rural/cityUnit/update/${id}`);
    },
    openDeleteSector(id) {
      this.uid = id;
      this.deleteDialog = true;
    },
    openUpdate(item) {
      console.log(item);
      this.unitData = item;
      this.dialogUpdate = true;
    },
    updateUnit() {
      const data = {
        title: this.unitData.unit_title,
      };
      // console.log(data);
      this.$axios.put(`/office-unit/${this.unitData.id}`, data).then((res) => {
        console.log(res.data);
        this.$toast.success("ສຳເລັດ");
        this.dialogUpdate = false;
      });
    },
    openCreateEmployee(id) {
      this.$router.push(`/rural/cityUnit/create/${id}`);
    },

    getUnit() {
      try {
        this.$axios.get(`/office-unit/${this.id}`).then((data) => {
          console.log(data.data);
          this.unit = data?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async createOfficeUnit() {
      const data = {
        office_id: this.id,
        title: this.title,
      };
      await this.$axios.post("/unit", data).then((data) => {
        console.log(data.data);
        this.dialog = false;
        this.title = "";
      });
      this.getUnit();
    },
    async deleteUnit(id) {
      await this.$axios.delete(`/office-unit/${id}`).then((data) => {
        console.log(data.data);
      });
      this.getUnit();
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
