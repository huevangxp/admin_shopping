<template>
    <v-card max-width="800" elevation="0" class="mx-auto">
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              label="ລະຫັດ"
              id="id"
              dense
              outlined
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              label="ຊື່"
              id="id"
              dense
              outlined
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark>cancel</v-btn>
        <v-btn color="teal" dark>Create</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
    title: {
      type: String,
      required: true,
    },
  },
    data() {
      return {
        id: '',
        name: '',
      }
    },
  }
  </script>
  