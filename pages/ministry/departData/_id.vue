<template>
  <div>
    <h1 class="my-10">ຈັດການພະແນກຂອງກົມ</h1>
<!-- {{ updateData }} -->
    <v-row>
      <v-col cols="6">
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
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="primary" dark @click="dialogDepartment = true"
          >ສ້າງພະແນກ</v-btn
        >
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
        fixed-header
        :search="search"
        @click:row="menubar"
      >
        <template #item.profile="{ item }">
          <div>
            <v-avatar size="70" color="red">
              <v-img :src="item?.profile" alt="profile"></v-img>
            </v-avatar>
          </div>
        </template>
        <template #item.idx="{ index }">
          <div>
            {{ index + 1 }}
          </div>
        </template>
        <template #item.created_at="{ item }">
          <div>
            {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
          </div>
        </template>
        <template #item.actions="{ item }">
          <div>
            <v-btn color="red" icon small @click="deleteUserDialog(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" icon small @click="openUpdate(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ສ້າງສະມາຊິກ </v-card-title>
        <v-card-title class="d-flex justify-center">
          <v-card-text class="d-none">
            <v-file-input
              id="picture"
              v-model="user.images"
              @change="uploadImage"
            ></v-file-input>
          </v-card-text>
          <v-avatar size="150" v-if="image">
            <v-img :src="image" alt="profile"></v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
          </v-avatar>
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            v-model="user.name"
            placeholder="ຊື່"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            placeholder="ນາມສະກຸນ"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            placeholder="ເບີ"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            placeholder="ອີເມວ"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.status"
            placeholder="ສະຖານະ"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.position"
            placeholder="ຕຳແໜ່ງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary white--text" @click="createAdmin()"
            >ສ້າງສະມາຊິກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDepartment"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field
            v-model="title"
            label="ຊື່ພະແນກ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogDepartment = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDepartment()"
            >ບັນທືກ</v-btn
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
        <v-card-title class="primary white--text">ອັບເດດພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field
            v-model="updateData.department_title"
            label="ຊື່ພະແນກ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer> 
          <v-btn color="red" outlined dark @click="dialogUpdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateDepartment()"
            >ບັນທືກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລືມຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" small outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " small @click="deleteUser(userId)"
            >ລືມຂໍ້ມູນ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      singleExpand: false,
      deleteDialog: false,
      dialogUpdate: false,
      updateData:{},
      search:'',
      image: "",
      userId: "",
      user: {},
      title: "",
      items:[],
      dialogDepartment: false,
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່", value: "department_title" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "", value: "actions" },
      ],
    };
  },
  mounted() {
    this.seleteDepartment();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    seleteDepartment() {
      try {
        this.$axios.get(`/select_all_department_id/${this.id}`).then((res) => {
          this.items = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    openUpdate(item) {
      this.updateData = item;
      // console.log(item);
      this.dialogUpdate = true
    },
    updateDepartment() {
      const data = {
        department: this.updateData.department_title
      }
      this.$axios.put(`/department/${this.updateData.id}`, data)
        .then((res) => {
          console.log(res.data);
          this.dialogUpdate = false;
          this.$toast.success('ສຳເລັດ')
        }).catch((err) => {
      this.$toast.error('ບໍສຳເລັດ')
     })
    },
  async  createDepartment() {
      try {
        const data = {
          department_title: this.title,
          department_organization_id: this.id,
        };
      await  this.$axios.post("/department", data).then((res) => {
          this.$toast.success("ສ້າງສຳເລັດ"); 
          this.dialogDepartment = false;
        });
        this.seleteDepartment();
      } catch (error) {
        console.log(error);
      }
    },
    menubar(item) {},
    deleteUserDialog(id) {
      this.userId = id;
      this.deleteDialog = true;
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
  },
};
</script>
