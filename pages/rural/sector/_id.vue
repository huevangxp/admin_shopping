<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງຂະແໜງ</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="ຄົ້ນຫາ"
          label="ຄົ້ນຫາ"
          id="id"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <v-btn color="primary" @click="dialog = true">ສ້າງຂະແໜງ</v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text flat v-if="sectorData.length <= 0">
        <v-data-table
          :headers="headers"
          :search="search"
          sort-by="index"
          class="elevation-0"
          hide-default-footer
          no-data-text=""
          :header-props="{ sortIcon: null }"
        ></v-data-table>
        <v-row class="justify-center mx-4 mt-4">
          <v-card
            flat
            class=""
            style="font-size: 20px; color: grey; margin-top: 40px"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            ກຳລັງໂຫຼດຂໍ້ມູນ
          </v-card>
        </v-row>
        <v-skeleton-loader style="margin-top: -125px" class="" type="image">
        </v-skeleton-loader>
      </v-card-text>
      <v-card-text v-else>
        <v-data-table
          :headers="headers"
          :items="sectorData"
          :search="search"
          :loading="loading"
        >
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
                    @click="deleteData(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>ລືບ</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small color="primary" dark v-on="on" @click="showUpdate(item)">
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
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງນະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ນະແໜງ</p>
          <v-text-field
            v-model="sector_title"
            label="ຊື່ຂະແໜງ"
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
          <v-btn color="primary" dark @click="createSector()">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ອັບເດດນະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ນະແໜງ</p>
          <v-text-field
            v-model="dataUpdate.sector_title"
            label="ຊື່ຂະແໜງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateSector()">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: this.$cookies.get("role"),
      sector_title: "",
      dialog: false,
      dialogUpdate: false,
      dataUpdate:{},
      loading: false,
      sectorData: [],
      search: "",
      headers: [
        {
          text: "ລ/ດ",
          align: "left",
          sortable: false,

          value: "idx",
        },
        {
          text: "ຊື້",
          value: "sector_title",
          align: "left",
          sortable: false,
        },
        {
          text: "",
          align: "left",
          sortable: false,

          value: "actions",
        },
        {
          text: "",
          align: "left",
          sortable: false,

          value: "employee",
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    openCreateEmployee(id) {
      this.$router.push(`/rural/sector/create/${id}`);
    },
    showUpdate(data) {
      console.log(data);
      this.dataUpdate = data;
      this.dialogUpdate = true
    },
    updateSector() {
      const data = {
        sector_title:this.dataUpdate.sector_title
      }
      // console.log(data);
      this.$axios.put(`/sector/${this.dataUpdate.id}`, data)
        .then((res) => {
          // this.dataUpdate = false
          this.dialogUpdate = false
        console.log(res.data);
        }).catch((err) => {
          this.$toast.error('ບໍ່ສຳເລັດ')
        })
    },
    getData() {
      this.loading = true;
      this.$axios
        .get(`/sectorAllById/${this.id}`)
        .then((res) => {
          this.sectorData = res?.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    async deleteData(id) {
      try {
        await this.$axios.delete(`/sector/${id}`).then((data) => {
          // console.log(data);
        });
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async createSector() {
      const data = {
        sector_title: this.sector_title,
        rarul_department_id: this.id,
      };
      await this.$axios.post("/sector", data).then((res) => {
        this.$toast.success("ສຳເລັດ");
        this.dialog = false;
        this.sector_title = "";
      });
      this.getData();
    },
  },
};
</script>
