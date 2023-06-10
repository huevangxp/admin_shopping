<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <v-btn color="primary" dark class="px-10" @click="dialog = true"
          >ສ້າງແຂວງ</v-btn
        >
      </v-col>
    </v-row>
    <h1 class="py-4">ທ້ອງຖິ່ນທັງໝົດ ( {{ province.count }} )</h1>
    <v-row>
      <v-col v-for="data in province.rows" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-card-text>
            <v-img
              :src="data.profile"
              lazy-src="/loading.gif"
              style="object-fit: cover; width: 100%; height: 100"
              alt="logo"
            ></v-img>
          </v-card-text>
          <v-card-text
            class="black--text d-flex justify-center pb-8"
            style="font-weight: bold; font-size: 20px"
          >
            {{ data.province_title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="teal white--text"> ສ້າງແຂວງ </v-card-title>
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
          <v-select
            :items="chooseProvince"
            v-model="province_title"
            item-value="pn"
            item-text="pn"
            label="ເລືອກແຂວງ"
            outlined
            dense
            class="mt-10"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false"> ຍົກເລີກ </v-btn>
          <v-btn v-if="loading" color="primary" dark>
            <v-progress-circular
              indeterminate
              size="20"
            ></v-progress-circular>
          </v-btn>
          <v-btn v-else color="primary" dark @click="createProvince()">
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
      images: "",
      image: "",
      province_title: "",
      expanded: [],
      singleExpand: false,
      dialog: false,
    };
  },
  mounted() {
    this.$store.dispatch("province/getProvince");
    this.$store.dispatch("province/getAllProvince");
  },
  computed: {
    province() {
      return this.$store.state.province.province;
    },
    chooseProvince() {
      return this.$store.state.province.address;
    },
    loading() {
      return this.$store.state.province.loading;
    },
  },
  methods: {
    async createProvince() {
      const object = {
        profile: this.images,
        province: this.province_title,
      };
      // console.log(object);
      await this.$store.dispatch("province/createProvince", { ...object });
      this.$store.dispatch("province/getProvince");
      this.dialog = false;
    },
    moveDepartment(id) {
      // this.$router.push(`/rural/department/${id}`);
      console.log("id--->", id);
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
