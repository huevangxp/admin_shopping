<template>
  <v-container fluid>
    <h1 class="pb-10">ຈັດການຂໍ້ມູນພື້ນຖານ</h1>
    <!-- {{ admin }} -->
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-card to="/dashboard/create">
          <v-card-text>
            <div
              class="font-weight-bold d-flex align-center"
              style="font-size: 20px"
            >
              <v-icon color="primary" size="30" style="opacity: 1" class="mr-4"
                >mdi-account</v-icon
              >
              <span
                class="d-flex justify-center text-h6 font-weight-bold black--text"
              >
                (<span class="primary--text">{{ admin?.count }}</span
                >) <span class="ml-2">ADMIN</span>
              </span>
            </div>
            <div class="grey--text text--lighten-1 ml-10 my-4">
              ເຂົ້າເບີ່ງລາຍລະອຽດ
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-card to="/dashboard/dataMinistry">
          <v-card-text>
            <div
              class="font-weight-bold d-flex align-center"
              style="font-size: 20px"
            >
              <v-icon color="primary" size="30" style="opacity: 1" class="mr-4"
                >mdi-bank</v-icon
              >
              <span
                class="d-flex justify-center text-h6 font-weight-bold black--text"
              >
                (<span class="primary--text">{{ ministry?.count }}</span
                >) <span class="ml-2">ສູນກາງ</span>
              </span>
            </div>
            <div class="grey--text text--lighten-1 ml-10 my-4">
              ເຂົ້າເບີ່ງລາຍລະອຽດ
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-card to="/dashboard/dataRarul">
          <v-card-text>
            <div
              class="font-weight-bold d-flex align-center"
              style="font-size: 20px"
            >
              <v-icon color="primary" size="30" style="opacity: 1" class="mr-4"
                >mdi-home-city-outline</v-icon
              >
              <span
                class="d-flex justify-center text-h6 font-weight-bold black--text"
              >
                (<span class="primary--text">{{ province?.count }}</span
                >) <span class="ml-2">ທ້ອງຖິ້ມ</span>
              </span>
            </div>
            <div class="grey--text text--lighten-1 ml-10 my-4">
              ເຂົ້າເບີ່ງລາຍລະອຽດ
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      interval: {},
      value: 10,
    };
  },
  computed: {
    province() {
      return this.$store.state.province.province;
    },
    ministry() {
      return this.$store.state.ministry.ministry;
    },
    admin() {
      return this.$store.state.user.admin;
    },
  },
  mounted() {
    this.$store.dispatch("ministry/getMinistry");
    this.$store.dispatch("province/getProvince");
    this.$store.dispatch("user/getAdmin");
  },
};
</script>
