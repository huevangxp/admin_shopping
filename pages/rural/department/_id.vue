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
        <v-btn color="primary" to="/department/detail/create">create ຂະແໜງ</v-btn>
        <!-- <v-btn color="green" dark>Export To excel</v-btn> -->
      </v-col>
    </v-row>
    {{ id }}
    <v-data-table
        :headers="dessertHeaders"
        :items="desserts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        class="elevation-1"
        @click:row="moveTodepartmentType"
        >
        <!-- show-expand -->
        <!-- v-if="role !== 'super_admin'" -->
        <template #[`item.idx`]="{index}">
            <div>
              {{ index+1 }}
            </div>
          </template>
          <template #[`item.actions`] >
            <div class="d-flex" >
              <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="red"
                  dark
                  v-on="on"
                  @click="createPhane(item.id)">
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
                  @click="createPhane(item.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>ແກ້ໄຂຂໍ້ມູນ</span>
            </v-tooltip>
         
            </div>
          </template >

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
                  @click="createPhane(item.id)">
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
              <!-- <v-btn color="primary" dark>view employee</v-btn> -->
              <!-- <v-btn color="primary" dark>create employee</v-btn> -->
            </div>
          </template>
  
      </v-data-table>
      <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
        <v-card>
          <v-card-title color="red">
            Do you want to delete this admin?
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
            consequuntur alias dignissimos totam temporibus repellendus recusandae
            est possimus nisi sit.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="dialog = false"> Cancel</v-btn>
            <v-btn color="primary" dark>Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "DetailRuralPage",
  data() {
    return {
      expanded: [],
        singleExpand: false,
        dialog: false,
      search: "",
        role:this.$cookies.get('role'),
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ຊື່ພະແນກ", value: "name" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
        ],
        desserts: [
          {
            id: 159,
            name: "ພະແນກການຕ່າງປະເທດ",
          },
          {
            id: 237,
            name: "ພະແນກຍຸຕິທໍາ",
          },
          {
            id: 262,
            name: "ພະແນກພາຍໃນ",
          },
          {
            name: "ພະແນກສຶກສາທິການ ແລະ ກິລາ",
            id: 305,
          },
        ],
        department: [
          {
            id: 159,
            name: "ຂະແໜງ 1",
          },
          {
            id: 237,
            name: "ຂະແໜງ 2",
          },
          {
            id: 262,
            name: "ຂະແໜງ 3",
          },
          {
            name: "ຂະແໜງ 4",
            id: 305,
          },
        ],
    };
  },
  methods: {
    moveTodepartmentType(item) {
       this.$router.push(`/rural/department/departmentType/${item.id}`)
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
