<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນ admin ຂອງທ້ອງຖີ່ນ</h1>
    <v-row>
      <v-col md="6">
        <v-text-field
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ທ້ອງຖີ່ນ"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn outlined color="primary" dark to="/dashboard/adminRarul/create"
          >ສ້າງ admin ຂອງທ້ອງຖີ່ນ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="department.rows"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
      dense
      fixed-header
    >
      <template #item.profile="{ item }">
        <div>
          <v-avatar size="70" color="red">
            <v-img :src="item?.profile" alt="profile"></v-img>
          </v-avatar>
        </div>
      </template>
      <template #item.idx="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.createdAt="{ item }">
        <div>
          {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn color="red" icon small @click.stop="deleteData(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary" icon small>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່", value: "user_name" },
        { text: "ສິດ", value: "role" },
        { text: "ຈັດການພະແນກ", value: "title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },
  computed: {
    department() {
      return this.$store.state.province.department;
    },
  },
  mounted() {
    this.$store.dispatch("province/getDepartment");
  },
  methods: {
    async deleteData(id) {
      console.log(id);
      // await this.$store.dispatch("ministry/deleteProvince", id);
      // this.$store.dispatch("ministry/getAllProvince");
    },
  },
};
</script>
