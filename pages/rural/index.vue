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
      <v-row>
      <v-col v-for="data in desserts" :key="data.id" cols="12" md="3">
        <v-card max-width="600px" @click="moveDepartment(data.id)">
          <v-card-text>
            <v-img
              max-height="400px"
              lazy-src="https://s.isanook.com/la/0/rp/rc/w700h366/yacxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2xhLzAvdWQvMTIvNjA1MzkvNjA1MzkuanBn.jpg"
              src="https://s.isanook.com/la/0/rp/rc/w700h366/yacxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2xhLzAvdWQvMTIvNjA1MzkvNjA1MzkuanBn.jpg"
              alt="logo"
            ></v-img>
          </v-card-text>
          <v-card-text class="black--text d-flex justify-center pb-8" style="font-weight: bold; font-size:20px">
            {{ data.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
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
  