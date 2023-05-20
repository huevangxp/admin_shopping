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
        <v-btn color="primary" to="/ministry/create">ສ້າງກະຊວງ</v-btn>
        <v-btn color="green" dark>ບັກທືນຂໍ້ມູນໄປ excel</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="desserts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex">
            <div v-if="role === 'admin'">
                <v-btn color="teal" dark @click="createPhane(item.id)"
                  >ສ້າງພະແນກ</v-btn
                >
            </div>
          <!-- <v-btn color="red" outlined  class="mr-2" dark small @click.stop="dialog = true"
            >ລຶບ</v-btn
          >
          <v-btn color="primary" small>ແກ້ໃຂ</v-btn> -->
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-col v-for="data in department" :key="data.id" cols="12">
            <v-card elevation="0" @click="moveDepartment(data.id)">
              <p>
                {{ data.name }}
              </p>
            </v-card>
            <v-divider></v-divider>
          </v-col>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red"> ສ້າງພະແນກ </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field label="ຊື່ພະແນກ" outlined dense></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark>ສ້າງພະແນກ</v-btn>
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
      role: "user",
      depId: "",
      search: "",
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ຊື່ກອງ", value: "name" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
      ],
      desserts: [
        {
          id: 159,
          name: "ກອງທີ1",
        },
        {
          id: 237,
          name: "ກອງທີ2",
        },
        {
          id: 262,
          name: "ກອງທີ3",
        },
        {
          name: "ກອງທີ4",
          id: 305,
        },
      ],
      department: [
        {
          id: 159,
          name: "ພະແນກ 1",
        },
        {
          id: 237,
          name: "ພະແນກ 2",
        },
        {
          id: 262,
          name: "ພະແນກ 3",
        },
        {
          name: " ພະແນກ 4",
          id: 305,
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    createPhane(id) {
      // alert(id)
      this.depId = id;
      this.dialog = true;
    },
  },
};
</script>
