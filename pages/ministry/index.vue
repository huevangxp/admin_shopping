<template>
  <v-container fluid>
    <h1>ຈັດການຂໍ້ມູນຂອງກະຊວງ</h1>
    <!-- <div class="d-flex justify-space-between">
      <h1 class="my-4 text-h6">ກະຊວງທັງໜົດ ( {{ ministry.count }} )</h1>
      <v-btn color="primary" @click="createMinistry()">ສ້າງກະຊວງ</v-btn>
    </div> -->
    <v-row>
      <v-col v-for="data in ministry.rows" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-img src="/card.png" alt="alt" style="width: 100%; height: 100px">
            <v-avatar size="150" color="white" class="ml-8 mt-10 fixed-avatar">
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
            {{ data.ministry_title }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="py-5">
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
        <v-card-title class="primary white--text"> ສ້າງກະຊວງ </v-card-title>
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
    deleteItem(id) {
      console.log(id);
    },
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
      this.$router.push(`/ministry/department/departmentData/${id}`);
    },
    createMinistry() {
      this.dialog = true;
    },
    async createMinistries() {
      const ministry = {
        profile: this.images,
        ministry_title: this.ministry_title,
      };
      await this.$store.dispatch("ministry/createMinistry", { ...ministry });
      this.$store.dispatch("ministry/getMinistry");
      this.dialog = false;
      this.ministry_title = "";
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
