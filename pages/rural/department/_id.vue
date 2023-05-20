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
      <v-col cols="4">
        <v-btn color="primary" to="/department/detail/create">create ຂະແໜງ</v-btn>
        <v-btn color="green" dark>Export To excel</v-btn>
      </v-col>
    </v-row>
    {{ id }}
    <v-data-table
        :headers="dessertHeaders"
        :items="desserts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
      >
        <template #[`item.actions`]>
          <div class="d-flex">
            <v-btn color="teal" dark>ສ້າງຂະແໜງ</v-btn>
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
              <v-col v-for="data in department" :key="data.id" cols="12">
                <v-card elevation="0" @click="moveDepartment(data.id)">
                  <p >
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
    moveDepartment(item) {
       this.$router.push(`/rural/manage/${item.id}`)
    //   console.log(item.id);
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
