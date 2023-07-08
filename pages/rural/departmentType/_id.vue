<template>
    <div>
     <!-- {{ id }} -->
     <div class="font-weight-bold mb-3" style="font-size: 30px">ຈັດການຂໍ້ມູນພະນັກງານຂອງ</div>
     <v-row dense>
       <v-col cols="12" sm="4" md="3">
         <v-card height="150px" @click="$router.push(`/ministry/departData/${id}`)">
           <v-card-text>
             <div
               class="font-weight-bold d-flex align-center"
               style="font-size: 20px"
             >
               <v-icon left>
                 mdi-account
               </v-icon>
               <span class="text-center">ຂໍ້ມູນຂອງພະແນກ</span>
             </div>
             <div class="grey--text text--lighten-1 ml-10 my-4">
               ເຂົ້າເບີ່ງລາຍລະອຽດ
             </div>
           </v-card-text>
         </v-card>
       </v-col>
       <v-col cols="12" sm="4" md="3">
         <v-card height="150px" @click="$router.push(`/rural/manage/${id}`)">
           <v-card-text>
             <div
               class="font-weight-bold d-flex align-center"
               style="font-size: 20px"
             >
               <v-icon  left>
                 mdi-account
               </v-icon>
               <span class="text-center">ຂໍ້ມູນຂອງພະນັກງານ</span>
             </div>
             <div class="grey--text text--lighten-1 ml-10 my-4">
               ເຂົ້າເບີ່ງລາຍລະອຽດ
             </div>
           </v-card-text>
         </v-card>
       </v-col>
     </v-row>
    </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
       };
     },
     computed: {
       id() {
         return this.$route.params.id;
       }
     },
     methods: {
       // moveToCreateD
     }
   };
   </script>
   