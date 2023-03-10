<template>
    <div id="backgrond-image">
        <v-card class="mx-auto my-5" max-width="400" elevation="10">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <!-- <div  class="d-flex justify-center pt-3">

        <v-avatar
         size="200"
         
        >
        <v-img
       
             src="https://wallpaperaccess.com/full/4593946.jpg"
           ></v-img>
        </v-avatar>
      </div> -->
      <v-img
       height="250"
             src="https://wallpaperaccess.com/full/4593946.jpg"
           ></v-img>
      <v-card-title  class="d-flex justify-center">ກະລຸນາເຂົ້າສູ່ລະບົບ</v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ຊື່ຜູ້ໃຊ້"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-account-key </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ລະຫັດຜ່ານ"
            type="password"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-key-plus </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card v-if="false" class="ma-3" outlined>
          <v-card-text class="pa-0">
            <v-card-title>For Testing</v-card-title>
            <v-card-text>
              <strong>Username: kayengxiong</strong>
              <br />
              <strong>Password: password</strong>
            </v-card-text>
          </v-card-text>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login" :loading="loading">
            ເຂົ້າສູ່ລະບົບ
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
    </div>
</template>

<script>
export default {
    layout:'Black',
    name:'LoginPage'
}
</script>

<style scoped>
#backgrond-image {
  background: url("https://wallpaperaccess.com/full/1739111.jpg") no-repeat
    center center fixed !important;
  background-size: cover;
  height: 100vh;
}
</style>