<template>
  <div>
    <!-- {{ ministry }} -->
    <v-row>
      <v-col md="6">
        <v-text-field
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ທ້ອງຖີ້ມ"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="primary" dark @click="dialog = true"
          >ສ້າງ admin ຂອງກະຊວງ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="provinceData.rows"
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
    <!-- <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງກົມ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-avatar size="150" v-if="image">
            <v-img :src="image" alt="profile"></v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
          </v-avatar>
        </div>
        <v-card-text>
          <v-select
            :items="chooseProvince"
            v-model="province"
            item-value="pn"
            item-text="pn"
            label="ເລືອກແຂວງ"
            return-object
            outlined
            dense
            class="mt-10"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createProvince()">ສ້າງກົມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      province:{}, 
      image: '',
      provinceData:{},
      images:'',
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ", value: "profile" },
        { text: "ຊື່ກະຊວງ", value: "province_title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },


  computed: {
    chooseProvince() {
      return this.$store.state.province.address;
    },
    province() {
      return this.$store.state.province.province;
    },
  },
  mounted() {
    this.$store.dispatch("province/getAllProvince");
    this.$axios.get('/province')
      .then((res) => {
      // console.log(res.data);
      this.provinceData = res?.data
    })

  },
  methods: {
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
  async  createProvince() {
      try {

        const formData = new FormData();
        formData.append("file", this.images)

        const imageUrl = await this.$axios.post('upload', formData)
          .then((res) => {
            return res?.data?.url;
          })

        if (imageUrl) {

          const data = {
            province_title: this.province.pn,
            pid: this.province.pid,
            profile: imageUrl
          }
          await this.$axios.post('/province', data)
          .then((res) => {
            // console.log(res.data);
            this.dialog = false
          this.$toast.success("ສຳເລັດ")
         })
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData(id) {
      console.log(id);
      // await this.$store.dispatch("ministry/deleteProvince", id);
      // this.$store.dispatch("ministry/getAllProvince");
    },
  },
};
</script>
