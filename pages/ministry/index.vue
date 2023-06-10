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
        <v-btn color="primary" @click="createMinistry()">ສ້າງກະຊວງ</v-btn>
      </v-col>
    </v-row>

    <h1 class="my-4 text-h4">ກະຊວງທັງໜົດ ( {{ ministry.count }} )</h1>
    <v-row>
      <v-col v-for="data in ministry.rows" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-card-text class="d-flex justify-content">
            <v-img
              :src="data.profile"
              alt="ministry-image"
              lazy-src="/loading.gif"
              style="object-fit: cover; width: 100%; height: 150"
              ></v-img>
          </v-card-text>
          <v-card-text
            class="black--text d-flex justify-center pb-8"
            style="font-weight: bold; font-size: 20px"
          >
         <v-icon class="px-3" size="40" color="teal">mdi-flag</v-icon>   {{ data.ministry_title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="teal white--text"> ສ້າງກະຊວງ </v-card-title>
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
        <v-card-text>
          <v-text-field
            v-model="ministry_title"
            class="mt-10"
            placeholder="ຊື່ກະຊວງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false"> ຍົກເລີກ </v-btn>
          <v-btn color="primary" dark @click="createMinistries()">
            ບັກທືນ
          </v-btn>
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
      search: "",
      dialog: false,
      image: "",
      images: "",
      ministry_title: "",
    };
  },
  mounted() {
    this.$store.dispatch("ministry/getMinistry");
  },
  computed: {
    ministry() {
      return this.$store.state.ministry.ministry;
    },
  },
  methods: {
    async deleteMinistry(id) {
      await this.$store.dispatch("ministry/deleteMinistry", id);
      this.$store.dispatch("ministry/getMinistry");
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
    moveDepartment(id) {
      this.$router.push(`/ministry/department/${id}`);
      console.log("id--->", id);
    },
    createMinistry() {
      this.dialog = true;
    },
    async createMinistries() {
      const ministry = {
        profile: this.images,
        ministry_title: this.ministry_title,
      };
      // console.log(ministry);
      await this.$store.dispatch("ministry/createMinistry", { ...ministry });
      this.$store.dispatch("ministry/getMinistry");
      this.dialog = false;
    },
  },
};
</script>
