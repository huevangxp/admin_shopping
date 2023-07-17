<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນກົມຂອງ <span class="primary--text" style="border-bottom:1px solid #000">{{ title }}</span></h1>
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
        {{ department }}
        <v-btn v-if="role === 'ministry_admin'" color="primary" @click="openCreate()">ສ້າງກົມຈັດຕັ້ງ</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="departmentDO.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      class="elevation-1"
      @click:row="moveTocreate"
      >
      <!-- show-expand -->
      <template #item.idx="{ idx, index }">
        <div>
          <p>{{ index + 1 }}</p>
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
                  @click="createPhane(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>ແກ້ໄຂຂໍ້ມູນ</span>
            </v-tooltip>
            
          </div>
        </div>
      </template>
      <template v-slot:item.employee="{ item }">
        <div class="d-flex" v-if="role === 'ministry_admin'">
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

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="green"
                  dark
                  v-on="on"
                  @click.stop="createPhane(item.id)"
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
       transition="dialog-transition">
       <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialogEmployee = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
     
      </v-card>
      <!-- <v-card>
        <v-card-title color="red">ສ້າງກົມ</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogEmployee = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDepartment()"
            >ສ້າງກົມ</v-btn
          >
        </v-card-actions>
      </v-card> -->
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
          <v-btn color="primary" dark @click="createDO()"
            >ສ້າງກົມ</v-btn
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
      expanded: [],
      singleExpand: false,
      dialog: false,
      dialogEmployee: false,
      eid:'',
      role: this.$cookies.get("role"),
      title: this.$cookies.get("title"),
      depId: "",
      search: "",
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
    this.$store.dispatch("department/getDepartmentDO");
    // this.$store.dispatch("department/getDepartment", id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    departmentDO() {
      return this.$store.state.department.departmentDO;
    },
  },
  methods: {
    openEmployee(id) {
      this.eid = id
      this.dialogEmployee = true
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
      console.log(id);
    },

    async createDO() {
      try {
        if (this.department_organization_title === '') {
        return this.$toast.error('ກະລຸນາປ້ອນຂໍ້ມູນ')
      }
      const data = {
        department_organization_title: this.department_organization_title,
        ministry_id: this.id,
      };
      await this.$store.dispatch("department/createDepartmentDO", { ...data });
      this.$store.dispatch("department/getDepartmentDO");
      this.dialog = false;
    } catch (error) {
      console.log(error);
    }
    },
    // getDepartment(id) {
    //   if (!this.department.rows) return [];
    //   return this.department.rows.filter(
    //     (el) => el.department_organization_id === id
    //   );
    // },
  },
};
</script>
