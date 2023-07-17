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
        <v-btn color="primary" @click="dialog = true">ສ້າງໜ່ວຍງານ</v-btn>
        <!-- <v-btn color="green" dark>Export To excel</v-btn> -->
      </v-col>
    </v-row>
    {{ id }}
    <v-data-table
      :headers="dessertHeaders"
      :items="unit"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
    >
      <!-- show-expand -->
      <!-- v-if="role !== 'super_admin'" -->
      <template #[`item.idx`]="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #[`item.actions`]="{item}">
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="red"
                dark
                v-on="on"
                @click="deleteUnit(item.id)"
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
                @click="createPhane(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>ແກ້ໄຂຂໍ້ມູນ</span>
          </v-tooltip>
        </div>
      </template>

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
                @click="createPhane(item.id)"
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
        <v-card-title color="red">ສ້າງຊື່ໜ່ວຍງານ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ໜ່ວຍງານ</p>
          <v-text-field
            v-model="title"
            label="ຊື່ໜ່ວຍງານ"
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
          <v-btn color="primary" dark @click="createOfficeUnit()"
            >ສ້າງໜ່ວຍງານ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "CityPage",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dialog: false,
      title: "",
      search: "",
      unit: [],
      role: this.$cookies.get("role"),
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ໜ່ວຍງານ", value: "unit_title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
      ],

      city: [
        {
          id: 159,
          name: "ໜ່ວຍງານ",
        },
      ],
    };
  },
  mounted() {
    this.$axios.get(`/office-unit/${this.id}`).then((data) => {
      console.log(data.data);
      this.unit = data?.data;
    });
  },
  methods: {
    async createOfficeUnit() {
      const data = {
        office_id: this.id,
        title: this.title,
      };
      // console.log(data);
      await this.$axios.post("/unit", data).then((data) => {
        console.log(data.data);
        this.dialog = false;
        this.title = ''
      });
      this.$axios.get(`/office-unit/${this.id}`).then((data) => {
        console.log(data.data);
        this.unit = data?.data;
      });
    },
   async deleteUnit(id) {
    await  this.$axios.delete(`/office-unit/${id}`).then((data) => {
        console.log(data.data);
    })
    this.$axios.get(`/office-unit/${this.id}`).then((data) => {
        console.log(data.data);
        this.unit = data?.data;
      });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
