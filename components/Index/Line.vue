<template>
    <v-container fluid>
      <v-row>
        <v-col cols="4" >
        <v-card max-width="600" class="text-center" elevation="0">
        <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="red"
    >
      {{ value }}
    </v-progress-circular>
    <v-card-title class="d-flex justify-center" >
      SUPER ADMIN
    </v-card-title>
       </v-card>
       </v-col>
       <v-col cols="4" >
       <v-card max-width="600" class="text-center" elevation="0">
        <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>
    <v-card-title class="d-flex justify-center" >
       ADMIN KASON
    </v-card-title>
       </v-card>
       </v-col>
       <v-col cols="4" >
       <v-card max-width="600" class="text-center" elevation="0">
        <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="black"
    >
      {{ value }}
    </v-progress-circular>
    <v-card-title class="d-flex justify-center" >
      ADMIN PROVINCE
    </v-card-title>
       </v-card>
      </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
    data () {
      return {
        interval: {},
        value: 10,
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 60) {
          return (this.value =    0)
        }
        this.value += 1 
      }, 1000)
    },
}
</script>