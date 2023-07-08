<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນພະນັກງານຂອງກະຊວງ</h1>
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
        <v-btn color="primary" to="/ministry/create">ສ້າງພະນັກງານກະຊວງ</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="employeeHeaders"
      hide-actions
      class="elevation-1"
      select-all
      pagination.sync="pagination"
      loading="true"
      search="search"
    >
      
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: this.$cookies.get("token"),
      employeeHeaders: [
        {
          text: "ລ/ດ",
          align: "center",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ" },
        { text: "ຊື້ແລະນາມສະກຸ່ມ"},
        { text: "ຕຳແໜງ" },
        { text: "ສະໄໝ" },
        { text: "ແຕ່ປີ" },
        { text: "ຫາປີ" },
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
   
  },
};
</script>
