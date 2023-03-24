<template>
  <v-container fluid >
    <v-row align="center"  justify="center" >
      <v-col cols="12" md="12" lg="12">
        <v-card elevation="1" max-width="800" class="mx-auto">
          <v-card max-width="250" height="250" class="mx-auto">
          <v-img :src="profilePicture" style="height: 100%; width: 100%;"></v-img>
          </v-card>
          <v-card-media :src="profilePicture" height="200"></v-card-media>
          <v-card-title>
    <span class="title">{{ fullName }} </span>
    <span class="subtitle">{{ status }}</span>
  </v-card-title>
          <!-- <v-card-subtitle class="text-center">{{ status }}</v-card-subtitle> -->
          <v-card-text>
            <p>Age: {{ age }}</p>
            <p>Address: {{ address }}</p>
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
      fullName: 'John Doe',
      status: 'Active',
      age: 25,
      address: '123 Main Street',
      profilePicture: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg', // replace with your own image URL
    }
  },
}
</script>

<style scoped>
.my-card {
/* background-image: url('https://www.shutterstock.com/image-photo/old-brick-black-color-wall-260nw-1605128917.jpg'); */
/* background-size: cover; */
background-color: azure;
height: 100%;
width: 100%;
}
.title {
font-size: 24px;
font-weight: bold;
}
.subtitle {
font-size: 16px;
font-weight: regular;
}
</style>
