<template>
    <div>
      <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງຂະແໜງ</h1>
      <v-row>
        <v-col cols="4">
          <v-text-field

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
          <v-btn color="primary" @click="dialog = true">ສ້າງຂະແໜງ</v-btn>
        </v-col>
      </v-row>
      <v-data-table
      :headers="headers"
      :items="sectorData"
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
                 >
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
               >
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
                 >
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
               
                >
                  <v-icon>mdi-account-multiple-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>ສ້າງ</span>
            </v-tooltip>

            </div>
          </template>
    
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field
            v-model="sector_title"
            label="ຊື່ຂະແໜງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createSector()"
            >ສ້າງພະແນກ</v-btn
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
        role: this.$cookies.get("role"),
          sector_title: '',
          dialog: false,
        sectorData:[],
        headers: [
          {
            text: "ລ/ດ",
            align: "center",
            sortable: false,
            value: "idx",
          },
          { text: "ຊື້", value: "sector_title"},
          { text: "" , value: "actions"},
          { text: "" , value: "employee"},
        ],
      };
    },
    mounted() {
      this.$axios.get(`/sectorAllById/${this.id}`)
          .then((res) => {
        // console.log(res.data);
        this.sectorData = res?.data;
      })
    },
    computed: {
      id() {
        return this.$route.params.id;
      },
    },
    methods: {
        createSector() {
          const data = {
           sector_title: this.sector_title,
            // rarul_department_id:'914bff7e-67dd-4a64-83a6-da218caf82d2'
            rarul_department_id:this.id
          }
          // console.log(data);
          this.$axios.post('/sector', data)
              .then((res) => {
                  console.log(res.data);
          })
     }
    },
  };
  </script>
  