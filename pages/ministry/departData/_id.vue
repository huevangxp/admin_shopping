<template>
    <div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            name="search"
            label="search"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="primary" dark @click="dialog = true">ສ້າງສະມາຊິກ</v-btn>
        </v-col>
      </v-row>
      <div>
        <v-data-table
        :headers="headers"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
        dense
        fixed-header 
      >
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
            <v-btn color="red" icon small @click="deleteUserDialog(item.id)">
            <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary"  icon small>
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      </div>
      <v-dialog
        v-model="dialog"
        persistent
        :overlay="false"
        max-width="500px"
       transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="primary white--text">
            ສ້າງສະມາຊິກ
          </v-card-title>
          <v-card-title class="d-flex justify-center">
            <v-card-text class="d-none">
              <v-file-input
                id="picture"
                v-model="user.images"
                @change="uploadImage"
              ></v-file-input>
            </v-card-text>
            <v-avatar size="150" v-if="image">
              <v-img :src="image" alt="profile"></v-img>
            </v-avatar>
            <v-avatar size="150" color="primary" @click="getImage" v-else>
              <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-text-field v-model="user.name" placeholder="ຊື່" outlined dense></v-text-field>
            <v-text-field v-model="user.lastName" placeholder="ນາມສະກຸນ" outlined dense></v-text-field>
            <v-text-field v-model="user.phone" placeholder="ເບີ" outlined dense></v-text-field>
            <v-text-field v-model="user.email" placeholder="ອີເມວ" outlined dense></v-text-field>
            <v-text-field v-model="user.status" placeholder="ສະຖານະ" outlined dense></v-text-field>
            <v-text-field v-model="user.position" placeholder="ຕຳແໜ່ງ" outlined dense></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" outlined @click="dialog = false">ຍົກເລິກ</v-btn>
            <v-btn color="primary white--text" @click="createAdmin()">ສ້າງສະມາຊິກ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="deleteDialog"  
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="primary white--text">
            ລືມຂໍ້ມູນ
          </v-card-title>
          <v-card-text class="py-6 text-center black--text">
            ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" small outlined @click='deleteDialog = false'>ຍົກເລິກ</v-btn>
          <v-btn color="primary " small  @click='deleteUser(userId)'>ລືມຂໍ້ມູນ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        deleteDialog: false,
        image: "",
        userId:'',
        user: {},
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
    mounted() {
     
    },
  
    computed: {
      id() {
        return this.$route.params.id;
      }
    },
  
    methods: {
      deleteUserDialog(id) {
        this.userId = id;
        this.deleteDialog = true;
      },
      uploadImage(e) {
        this.url = URL.createObjectURL(e);
        this.image = this.url;
      },
      getImage() {
        document.getElementById("picture").click();
      },
    
      
    },
  };
  </script>
  