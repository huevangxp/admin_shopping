<template>
  <div>
      <!-- :items="admin.rows" -->
      <v-row>
      <v-col md="6">
        <v-text-field
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ຂອງກະຊວງ"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn  color="primary" dark to="/dashboard/adminMinistry/create">ສ້າງ admin ຂອງກະຊວງ</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
      dense
      fixed-header 
      >
      <!-- @click:row="showDetails" -->
    <template #item.profile= "{item}">
      <div>
        <v-avatar
          size="70"
          color="red"
        >   
        <v-img
         :src="item?.profile" alt="profile"></v-img>
        </v-avatar>
      </div>
    </template>
      <template #item.idx="{  index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.createdAt = '{item}'>
        <div>
          {{ $moment(item.createdAt).format('DD/MM/YYYY') }}
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn color="red" icon small @click.stop="deleteUserDialog(item.id)">
          <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary"  icon small>
            <v-icon>mdi-account-edit</v-icon>
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
        { text: "ຮູບ", value: "profile" },
        { text: "ຊື່", value: "name" },
        { text: "ນາມສະກຸນ", value: "lastName" },
        { text: "ເບິ", value: "phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະຖານະ", value: "role" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },
};
</script>
