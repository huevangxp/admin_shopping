<template>
  <v-container fluid>
  <v-container fluid>
    <IndexLine/>
  </v-container>
  <div>
        <div class=" font-weight-bold mb-3" style="font-size:26px">ການຈັດການຂໍ້ມູນ</div>
        <v-row dense>
            <v-col
                v-for="item in lists"
                :key="item.title"
                cols="12"
                sm="4"
                md="3"
            >
                <v-card flat @click="$router.push(item.to)">
                    <v-card-text>
                        <div
                            class="font-weight-bold d-flex align-center"
                        >
                            <v-img
                                :src="item.src"
                                max-width="24"
                                contain
                                class="mr-3"
                            ></v-img>
                            {{ item.title }}
                        </div>
                        <div class="">10 ຢ່າງ</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
  </v-container>
</template>


<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      dialog: false,
      search:'',
      lists: [
                {
                    title: "admin ໃຫຍ່",
                    src: "https://pngimg.com/d/book_PNG51090.png",
                    to: "/dashboard/admin"
                },
                {
                    title: "ສ້າງ admin",
                    src: "https://cdn-icons-png.flaticon.com/512/2784/2784403.png",
                    to:"/dashboard/create"
                },
                // {
                //     title: "ໝວດ",
                //     src: "https://cdn-icons-png.flaticon.com/512/3502/3502688.png",
                //     to: "/manage/category"
                // },
                {
                    title: "ພະນັກງານ",
                    src: "https://static.vecteezy.com/system/resources/thumbnails/011/299/670/small/businessman-and-company-staff-posing-character-3d-character-illustration-png.png",
                    // to: "//staff"
                },
                // {
                //     title: "ຜູ້ສະຫນອງ",
                //     src: "https://static.vecteezy.com/system/resources/previews/010/833/979/original/industrial-plant-with-solar-panels-ev-charging-electrical-system-in-the-factory-solar-energy-3d-illustration-free-png.png",
                //     to:"/suppiler"
                // },
                // {
                //     title: "ການປັບໄຫມ",
                //     src: "https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-free-png.png",
                //     to:"/fine"
                // },
                
            ],
        
      
    }
  },
  mounted() {
    // this.$router.push('/login')
  }
}
</script>
