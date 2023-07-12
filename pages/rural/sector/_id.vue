<template>
    <div>
      <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງຂະແໜງ</h1>
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
          <v-btn color="primary" >ສ້າງຂະແໜງ</v-btn>
        </v-col>
      </v-row>
      <v-data-table
          :headers="employeeHeaders"
          :items="desserts"
          @click:row="createData"
          >
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
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        role: this.$cookies.get("role"),
        employeeHeaders: [
          {
            text: "ລ/ດ",
            align: "center",
            sortable: false,
            value: "idx",
          },
          { text: "ຊື້", value: "name"},
          { text: "" , value: "actions"},
          { text: "" , value: "employee"},
        ],
        desserts: [
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
    mounted() {

    },
    computed: {
      id() {
        return this.$route.params.id;
      },
    },
    methods: {
        createData(item) {
          // this.$router.push(`/rural/sectorData/${item.id}`)
     }
    },
  };
  </script>
  