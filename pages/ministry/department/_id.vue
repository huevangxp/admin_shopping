<template>
  <div>
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
        <v-btn color="primary" @click="openCreate()">ສ້າງກົມຈັດຕັ້ງ</v-btn>
        <v-btn color="green" dark>ບັກທືນຂໍ້ມູນໄປ excel</v-btn>
      </v-col>
    </v-row>
    <h1 class="my-2 text-h4">
      ກົມຈັດຕັ້ງທັງໝົດ ( {{ departmentDO?.count }} )

      <!-- {{ departmentDO }} -->
    </h1>
    <!-- <template> -->
  <!-- <v-data-table
    :headers="dessertHeaders"
    :items="departmentDO"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    class="elevation-1"
    >
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.id }}
      </td>
    </template>
  </v-data-table>
</template> -->

    <v-data-table
      :headers="dessertHeaders"
      :items="departmentDO.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      class="elevation-1"
      >
      <!-- value="item" -->
      <!-- @click="alert(item.id)" -->
    <template #item.idx = "{idx, index}">
      <div>
        <p>{{index+1}}</p>
      </div>
    </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
            <div>
                <v-btn outlined small color="teal" dark @click="createPhane(item.id)">ສ້າງພະແນກ</v-btn>
            </div>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" :ref="item.id" >
          <!-- {{ item.id }} -->
          <v-col v-for="data in department.rows" :key="data.id" cols="12">
            <v-card elevation="0">
              <p>
                {{ data.department_title }}
              </p>
            </v-card>
            <v-divider></v-divider>
          </v-col>
        </td>
      </template>
    </v-data-table>

    <!-- {{ departmentDO }} -->

    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red"> ສ້າງພະແນກ </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field v-model="department_title" label="ຊື່ພະແນກ" outlined dense></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDepartment()">ສ້າງພະແນກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDO" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text"> ສ້າງກົມຈັດຕັ້ງ </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ກົມຈັດຕັ້ງ</p>
          <v-text-field v-model="department_organization_title" label="ຊື່ກົມຈັດຕັ້ງ" outlined dense></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogDO = false"
            >ຍົກເລິກ</v-btn>
          <v-btn color="primary" dark @click="createDO()">ສ້າງກົມຈັດຕັ້ງ</v-btn>
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
      dialogDO:false,
      role: "user",
      depId: "",
      search: "",
      department_title:'',
      department_organization_title: '',
  
      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກົມ", value: "department_organization_title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
      ],
    
    };
  },
  mounted() {
    this.$store.dispatch("department/getDepartmentDO");
    this.$store.dispatch("department/getDepartment");
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    departmentDO() {
      return this.$store.state.department.departmentDO;
    },
    department() {
      return this.$store.state.department.department;
    },
  },
  methods: {
    openCreate() {
      this.dialogDO = true
    },
    createPhane(id) {
      this.depId = id;
      this.dialog = true;
    },
   async createDepartment() {
      const object = {
        department_organization_id: this.depId,
        department_title:this.department_title
      }

     await this.$store.dispatch('department/createDepartment', { ...object });
     this.$store.dispatch("department/getDepartment");
     this.dialog = false;
    },
   async createDO() {
      const data = {
        department_organization_title: this.department_organization_title,
        ministry_id:this.id
      }

    await  this.$store.dispatch('department/createDepartmentDO', { ...data })
     this.$store.dispatch("department/getDepartmentDO");
      this.dialogDO = false
    }
  },
};
</script>
