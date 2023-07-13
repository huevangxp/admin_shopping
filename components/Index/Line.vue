<template>
  <v-container fluid>
 
    <v-row>
      <v-col cols="12" md="3"> 
      <v-card to="/dashboard/create">
        <v-card-title class="d-flex justify-center">
          <v-btn color="primary"  fab elevation="0" >
            <v-icon color="white" size="30" style="opacity: 1">mdi-account</v-icon>
          </v-btn>
        </v-card-title>
        <!-- <v-divider color="primary"></v-divider> -->
        <v-card-text>
          
        <p class="d-flex justify-center text-h6 font-weight-bold black--text">
         (<span class="primary--text">0</span>)  <span class="ml-5">ADMIN</span>
        </p>
        <span class="d-flex justify-center ">
          ເຂົ້າເບີ່ງ admin
        </span>
        </v-card-text>
      </v-card>  
      </v-col>
      <v-col cols="12" md="3"> 
      <v-card to="/dashboard/dataMinistry">
        <v-card-title class="d-flex justify-center">
          <v-btn color="primary"  fab elevation="0" >
            <v-icon color="white" size="30" style="opacity: 1">mdi-bank</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          
        <p class="d-flex justify-center text-h6 font-weight-bold black--text">
          (<span class="primary--text">{{ ministry.count  }}</span>)  <span class="ml-5">ສູນກາງ</span>
          
        </p>
        <span class="d-flex justify-center ">
          ເຂົ້າເບີ່ງສູນກາງ
        </span>
        </v-card-text>
      </v-card>  
      </v-col>
      <v-col cols="12" md="3"> 
      <v-card to="/dashboard/dataRarul">
        <v-card-title class="d-flex justify-center">
          <v-btn color="primary"  fab elevation="0" >
            <v-icon color="white" size="30" style="opacity: 1">mdi-home-city-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>

        <p class="d-flex justify-center text-h6 font-weight-bold black--text">
          (<span class="primary--text">{{ province.count }}</span>)  <span class="ml-5">ທ້ອງຖິ້ມ</span>
          
        </p>
        <span class="d-flex justify-center ">
          ເຂົ້າເບີ່ງທ້ອງຖິ້ມ
        </span>
        </v-card-text>
      </v-card>  
      </v-col>
      <v-col cols="12" md="3"> 
      <v-card>
        <v-card-title class="d-flex justify-center">
          <v-btn color="primary"  fab elevation="0" >
            <v-icon color="white" size="30" style="opacity: 1">mdi-home-city-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          
        <p class="d-flex justify-center text-h6 font-weight-bold black--text">
          (<span class="primary--text">0</span>)  <span class="ml-5">ພະນັກງານ</span>
          
        </p>
        <span class="d-flex justify-center ">
          ເຂົ້າເບີ່ງພະນັກງານ
        </span>
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
      return this.$store.state.ministry.ministry
    }
  },
  mounted() {
    this.$store.dispatch('ministry/getMinistry');
    this.$store.dispatch("province/getProvince");
  },
};
</script>
