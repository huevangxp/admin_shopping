<template>
  <div>
    <h1 class="my-10 ml-3">
      ຈັດການຂໍ້ມູນພະແນກ
      <span class="primary--text" style="border-bottom: 1px solid #000">{{
        title
      }}</span>
    </h1>
    <v-card elevation="0" class="mx-3">
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
        <v-col cols="4" class="d-flex justify-end">
          <v-btn outlined color="primary" @click="dialog = true"
            >ສ້າງພະແນກ</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0">
      <v-card-text v-if="departmentDO?.length <= 0">
        <v-card elevation="0">
          <v-card-text>
            <v-data-table
              :headers="dessertHeaders"
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
                <span class="red--text">ຍັງບໍ່ມີຂໍ້ມູນ</span>
              </v-card>
            </v-row>
            <v-skeleton-loader style="margin-top: -125px" class="" type="image">
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text v-else>
        <v-data-table
          :headers="dessertHeaders"
          :items="departmentDO"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="id"
          class="elevation-1"
          :search="search"
        >
          <template #item.idx="{ idx, index }">
            <div>
              <span>{{ index + 1 }}</span>
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <div>
              <div>
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
                  <span>ລືບຂໍ້ມູນ</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="green"
                      dark
                      v-on="on"
                      @click.stop="updateDO(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>ແກ້ໄຂຂໍ້ມູນ</span>
                </v-tooltip>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field
            v-model="department_organization_title"
            class="pt-10"
            label="ຊື່ພະແນກ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDO()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdateDO"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດບພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ກົມ</p> -->
          <v-text-field
            v-model="mData.title"
            class="pt-10"
            label="ຊື່ກົມ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdateDO = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updated()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete department do -->
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລຶບຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລຶບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteDO">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteDialog: false,
      expanded: [],
      singleExpand: false,
      dialog: false,
      dialogUpdateDO: false,

      eid: "",
      mData: {},
      role: this.$cookies.get("role"),
      title: this.$cookies.get("title"),
      doId: "",
      search: "",
      departmentDO: [],
      department_organization_title: "",

      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ພະແນກ", value: "title" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  mounted() {
    this.getDepartmentDO();
  },
    computed: {
        id() {
            return this.$route.params.id;
    }
  },
  methods: {
    async deleteDO() {
      try {
        await this.$axios
          .$delete(`/delete-prepare-department/${this.doId}`)
          .then((res) => {
            console.log(res.data);
            this.deleteDialog = false;
            this.$toast.success("ລືບຂໍ້ມູນສຳເລັດ");
          })
          .catch((error) => {
            this.$toast.error("ບໍ່ສຳມາດລຶບໄດ້");
          });
        this.getDepartmentDO();
      } catch (error) {
        console.log(error);
      }
    },

    getDepartmentDO() {
      this.$axios
        .get(`/select-prepare-department/${this.id}`)
        .then((res) => {
            // console.log('------------->',res.data);
          this.departmentDO = res?.data;
        });
    },

    updateDO(item) {
      this.mData = item;
      this.dialogUpdateDO = true;
    },
    updated() {
      const data = {
        title: this.mData.title,
      };

      this.$axios
        .put(`/update-prepare-department/${this.mData.id}`, data)
        .then((res) => {
          (this.dialogUpdateDO = false), this.$toast.success("ສຳເລັດ");
        })
        .catch((err) => {
          this.$toast.error("ອັບເດັບບໍສຳເລັດ");
        });
    },

    async deleteData(id) {
      this.doId = id;
      this.deleteDialog = true;
    },
    async createDO() {
      try {
        if (this.department_organization_title === "") {
          return this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນ");
        }
        const data = {
          title: this.department_organization_title,
          province_id: this.id,
        };
        await this.$axios
          .post("/prepare-department", data)
          .then((res) => {
            this.getDepartmentDO();
            this.$toast.success("ສຳເລັດ");
            this.dialog = false;
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
