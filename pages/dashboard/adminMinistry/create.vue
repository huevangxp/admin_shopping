<template>
  <div>
    <v-card class="mx-auto" max-width="600" elevation="0">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="d-none">
            <v-file-input
              id="picture"
              v-model="images"
              @change="uploadImage"
            ></v-file-input>
          </v-card-text>
          <div class=" d-flex justify-center">
            <v-avatar size="150" v-if="image">
              <v-img :src="image" alt="profile"></v-img>
            </v-avatar>
            <v-avatar size="150" color="primary" @click="getImage" v-else>
              <v-icon size="70" color="white"
                >mdi-file-image-plus-outline</v-icon
              >
            </v-avatar>
          </div>
        <v-card-text>
            <v-text-field
               outlined
               dense
               type="text"
               placeholder="ຊື່ກະຊວງ"
            ></v-text-field>
        </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
          <v-row>
            <v-col>
                <v-text-field
                dense
                outlined
                placeholder="name"
                ></v-text-field>
            </v-col>
          </v-row>
          </v-card-text>
        </v-window-item>


      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
        <v-spacer></v-spacer>

        <v-btn v-if="step == 2"  color="primary" depressed @click="create">
          ບັກທືນ
        </v-btn>
        <v-btn  v-else color="primary" depressed @click="step++">
          ບັກທືນ
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: "",
      image: "",
      step: 1,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "ສ້າງກະຊວງ";
          default :
          return "ສ້າງ admin ຂອງກະຊວງ";
        // default:
        //   return "";
      }
    },
  },
  methods: {
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
      },
      create() {
        alert('huevang')
      }
  },
};
</script>
