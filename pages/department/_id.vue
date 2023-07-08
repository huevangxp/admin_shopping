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
        <v-btn color="primary" to="/department/detail/create">create ministry</v-btn>
        <v-btn color="green" dark>Export To excel</v-btn>
      </v-col>
    </v-row>
    {{ id }}
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      @click:row="moveDepartment"
    >
      <template #[`item.profile`]="{ item }">
        <v-avatar size="60" color="primary">
          <v-img :src="item.profile" alt="hue"></v-img>
        </v-avatar>
      </template>
      <template #[`item.actions`]>
        <div class="d-flex">
          <v-btn color="primary" class="mr-2" small>Edit</v-btn>
          <v-btn color="red" dark small @click.stop="dialog = true">Delete</v-btn>
        </div>
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
      dialog: false,
      search: "",
      headers: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ຜູ້ບໍລິຫານ", value: "name" },
        { text: "", value: "actions" },
      ],
      desserts: [
        {
          id: 159,
          name: "ທ່ານ ຫຼ້າ",
        },
        {
          id: 237,
          name: "ທ່ານ ແກ້ວ",
        },
        {
          id: 262,
          name: "ທ່ານ ອັນເດີ",
        },
        {
          name: "ທ່ານ ຈັນ",
          id: 305,
        },
        {
          name: "ທ່ານ ຄານ",
          id: 356,
        },
      ],
    };
  },
  methods: {
    moveDepartment(item) {
       this.$router.push(`/department/detail/${item.id}`)
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
