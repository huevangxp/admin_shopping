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
          <v-btn color="primary" to="/rural/create">create rural</v-btn>
          <v-btn color="green" dark>Export To excel</v-btn>
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
        <template #[`item.actions`]>
          <div class="d-flex">
            <v-btn color="primary" class="mr-2" small>Edit</v-btn>
            <v-btn color="red" dark small @click.stop="dialog = true"
              >Delete</v-btn
            >
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <!-- <th  @click="moveDepartment(item.id)"> -->
          <td :colspan="headers.length">
            <!-- <v-row> -->
              <v-col v-for="data in department" :key="data.id" cols="12">
                <v-card elevation="0" @click="moveDepartment(data.id)">
                  <p >
                    {{ data.name }}
                  </p>
                </v-card>
                <v-divider></v-divider>
              </v-col>
            <!-- </v-row> -->
          </td>
          <!-- </th> -->
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
    name: "InspirePage",
  
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
          { text: "ຊື່ແຂວງ", value: "name" },
          { text: "", value: "actions" },
          { text: "", value: "data-table-expand" },
        ],
        desserts: [
          {
            id: 159,
            name: "ນະຄອນຫຼວງ",
          },
          {
            id: 237,
            name: "ວຽງຈັນ",
          },
          {
            id: 262,
            name: "ສາລະວັນ",
          },
          {
            name: "ຊຽງຂວາງ",
            id: 305,
          },
        ],
        department: [
          {
            id: 159,
            name: "ພະແນກການເງິນ",
          },
          {
            id: 237,
            name: "ພະແນກລັດ",
          },
          {
            id: 262,
            name: "ພະແນກບໍລິຫານ",
          },
          {
            name: "ພະແນກຂາຍ",
            id: 305,
          },
        ],
      };
    },
    methods: {
      moveDepartment(id) {
        this.$router.push(`/rural/department/${id}`);
        console.log('id--->',id);
      },
    },
  };
  </script>
  