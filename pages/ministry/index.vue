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
        <v-btn color="primary" to="/ministry/create">ສ້າງກະຊວງ</v-btn>
        <v-btn color="green" dark>ບັກທືນຂໍ້ມູນໄປ excel</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="data in department" :key="data.id" cols="12" md="3">
        <v-card max-width="600px" @click="moveDepartment(data.id)">
          <v-card-text>
            <v-img
              max-height="400px"
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://play-lh.googleusercontent.com/Il595a_LeHK5icPWbot8O2FArhYvCbcCanSYM6uJk0VAlkrz3gBIqnN55QzNUGS23W4=s180-rw"
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
      department: [
        {
          id: 159,
          name: "ກະຊວງການຕ່າງປະເທດ",
        },
        {
          id: 237,
          name: "ກະຊວງຍຸຕິທໍາ",
        },
        {
          id: 262,
          name: "ກະຊວງພາຍໃນ",
        },
        {
          name: "ກະຊວງສຶກສາທິການ ແລະ ກິລາ",
          id: 305,
        },
      ],
    };
  },
  methods: {
    moveDepartment(id) {
      this.$router.push(`/ministry/department/${id}`);
      console.log("id--->", id);
    },
  },
};
</script>
