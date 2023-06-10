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
        class="elevation-1"
        select-all
        pagination.sync="pagination"
        item-key="id"
        loading="true"
        search="search"
      >
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
            <!-- <v-icon>mdi-cancel</v-icon> -->
        </v-card-title>
        <v-card-title class="d-flex justify-center">
          <v-card-text class="d-none">
            <v-file-input
              id="picture"
              v-model="images"
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
          <v-text-field placeholder="name" outlined dense></v-text-field>
          <v-text-field placeholder="name" outlined dense></v-text-field>
          <v-text-field placeholder="name" outlined dense></v-text-field>
          <v-text-field placeholder="name" outlined dense></v-text-field>
          <v-text-field placeholder="name" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" outlined @click="dialog = false">ຍົກເລິກ</v-btn>
            <v-btn color="primary white--text">ສ້າງສະມາຊິກ</v-btn>
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
        image: "",
        images: "",
        headers: [
        {text: "id", value:'id'},
        {text: "image", value:'id'},
        {text: "name", value:'id'},
        {text: "lastname", value:'id'},
        {text: "address", value:'id'},
        {text: "actions", value:'id'},
      ]
    };
    },
    methods: {
        uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
  }
};
</script>
