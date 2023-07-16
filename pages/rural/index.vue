<template>
  <v-container fluid>
    <h1 class="mb-3">ຈັດການຂໍ້ມູນຂອງກະຊວງ</h1>
    <v-row>
      <v-col v-for="data in province.rows" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-img src="/card.png" alt="alt" style="width: 100%; height: 100px">
            <v-avatar size="150" color="white" class="ml-10 mt-10 fixed-avatar">
              <v-img
                :src="data.profile"
                alt="ministry-image"
                lazy-src="/loading.gif"
                style="object-fit: fill;"
              ></v-img>
            </v-avatar>
          </v-img>
          <v-card-text style="height: 100px"> </v-card-text>
          <v-card-text
            class="black--text d-flex justify-center"
            style="font-weight: bold; font-size: 16px"
          >
            {{ data.province_title }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="py-5" v-if="role == 'ministry'">
            <v-spacer></v-spacer>
            <v-btn color="red" outlined fab small @click.stop="deleteItem(data.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" outlined fab small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="primary white--text"> ສ້າງແຂວງ </v-card-title>
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
      role:this.$cookies.get("role"),
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
      this.$router.push(`/rural/department/${id}`);
      // console.log("id--->", id);
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

<style>
.fixed-avatar {
  position: fixed;
  z-index: 888;
}
</style>
