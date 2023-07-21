<template>
  <div>
    <h1 class="my-10">
      ຈັດການຂໍ້ມູນກົມຂອງ
      <span class="primary--text" style="border-bottom: 1px solid #000">{{
        title
      }}</span>
    </h1>
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
      <v-col cols="4">
        <v-btn
          v-if="role === 'ministry_admin'"
          color="primary"
          @click="openCreate()"
          >ສ້າງກົມຈັດຕັ້ງ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="departmentDO.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      class="elevation-1"
      :search="search"
      @click:row="moveTocreate"
    >
      <template #item.idx="{ idx, index }">
        <div>
          <span>{{ index + 1 }}</span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex" v-if="role === 'ministry_admin'">
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
        <div v-else>
          <span class="red--text">ບໍ່ສາມາດແກ້ໄຂໄດ້</span>
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
            <v-tooltip bottom v-if="role === 'ministry_admin'">
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
    <v-dialog
      v-model="dialogEmployee"
      max-width="500px"
      fullscreen
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-avatar class="mx-2" size="40" color="white">
            <v-icon color="primary">mdi-account</v-icon>
          </v-avatar>
          <v-toolbar-title>ພະນັກງານນອງກົມ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialogEmployee = false"> ປິດ </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5 mx-5">
          <v-row>
            <v-col
              v-for="(item, index) in employeeDepartmentDO.rows"
              :key="index"
              cols="12"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
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
                        <v-btn icon dark small color="green" @click.stop="updateEm(item.id)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-speed-dial>
                    </div>

                    <div class="mt-2">
                      <!-- <p class="black--text">ຕຳແໜງ: </p> -->
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
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງກົມ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ກົມ</p>
          <v-text-field
            v-model="department_organization_title"
            label="ຊື່ກົມ"
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
          <v-btn color="primary" dark @click="createDO()">ສ້າງກົມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdateDO"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title color="red">ອັບເດບກົມ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ກົມ</p>
          <v-text-field
            v-model="mData.department_organization_title"
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
    <v-dialog
      persistent
      v-model="dialogCreateEmployee"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ສ້າງພະນັກງານ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <div class="d-flex justify-center my-5">
          <v-avatar size="150" v-if="image">
            <v-img :src="image" alt="profile"></v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
          </v-avatar>
        </div>
        <v-card-text class="mt-3">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name"
                label="ຊື່"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.last_name"
                label="ນາມສະກຸ່ມ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.phone"
                label="ເບີໂທ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.position"
                label="ຕຳແໜງ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.address"
                label="ທີ່ຢູ່"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="user.details"
                counter="50"
                label="ປະຫັວດຫຍໍ້"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogCreateEmployee = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createEmployee()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      images: "",
      image: "",
      expanded: [],
      singleExpand: false,
      dialog: false,
      dialogEmployee: false,
      dialogCreateEmployee: false,
      dialogUpdateDO: false,
      direction: "bottom",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
      eid: "",
      mData: {},
      role: this.$cookies.get("role"),
      title: this.$cookies.get("title"),
      depId: "",
      search: "",
      employeeDepartmentDO: {},
      departmentDO: {},
      department_organization_title: "",

      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກົມ", value: "department_organization_title" },
        { text: "ຈັດການ", value: "actions" },
        { text: "ຈັດການພະນັກງານ", value: "employee" },
      ],
    };
  },
  mounted() {
    this.getDepartmentDO();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    // departmentDO() {
    //   return this.$store.state.department.departmentDO;
    // },
  },
  methods: {
  async  deleteEm(id) {
     await this.$axios.delete(`/department-member/${id}`)
        .then((res) => {
          console.log(res.data);
          this.$toast.success('ສຳເລັດ')
        })
        await this.$axios.get(`/get-organization-member/${this.mid}`).then((res) => {
        this.employeeDepartmentDO = res?.data;
      });
    },
    updateEm(id) {
      this.$router.push(`/ministry/department/update/${id}`);
    },
    getDepartmentDO() {
      this.$axios.get(`/department-organizations/${this.id}`).then((res) => {
        this.departmentDO = res?.data;
      });
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
    openCreateEmployee(id) {
      this.$router.push(`/ministry/department/create/${id}`);
    },
    updateDO(item) {
      this.mData = item;
      this.dialogUpdateDO = true;
    },
    updated() {
      const data = {
        department_organization_title: this.mData.department_organization_title,
      };

      this.$axios
        .put(`/department-organization/${this.mData.id}`, data)
        .then((res) => {
          console.log(res.data);
          (this.dialogUpdateDO = false), this.$toast.success("ສຳເລັດ");
        })
        .catch((err) => {
          this.$toast.error("ອັບເດັບບໍສຳເລັດ");
        });
    },
    async createEmployee() {
      try {
        const formData = new FormData();
        formData.append("file", this.images);
        const image = await this.$axios.post("upload", formData).then((res) => {
          return res?.data?.url;
        });
        if (image) {
          const data = {
            department_organization_id: this.mid,
            profile: image,
            ...this.user,
          };
          await this.$axios
            .post("/create-member-organization", data)
            .then((res) => {
              this.$toast.success("ສຳເລັດ");
              this.dialogCreateEmployee = false;
            });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async openEmployee(id) {
      this.mid = id;
      await this.$axios.get(`/get-organization-member/${id}`).then((res) => {
        this.employeeDepartmentDO = res?.data;
      });
      this.dialogEmployee = true;
    },
    moveTocreate(item) {
      this.$router.push(`/ministry/departData/${item.id}`);
    },
    openCreate() {
      this.dialog = true;
    },
    createPhane(id) {
      this.depId = id;
      this.dialog = true;
    },
    async deleteData(id) {
      // console.log(id);
      await this.$axios
        .$delete(`/department-organization/${id}`)
        .then((res) => {
          console.log(res.data);
          this.$toast.success("ລືບຂໍ້ມູນສຳເລັດ");
        });
      this.getDepartmentDO();
    },
    async createDO() {
      try {
        if (this.department_organization_title === "") {
          return this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນ");
        }
        const data = {
          department_organization_title: this.department_organization_title,
          ministry_id: this.id,
        };
        await this.$store.dispatch("department/createDepartmentDO", {
          ...data,
        });
        this.getDepartmentDO();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
