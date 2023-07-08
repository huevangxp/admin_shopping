<template>
    <div>
        <div class=" font-weight-bold mb-3" style="font-size:30px">ການລາຍງານ</div>
        <v-row dense>
            <v-col
                v-for="item in lists"
                :key="item.title"
                cols="12"
                sm="4"
                md="4"
            >
                <v-card 
                hover shaped raised
                class="white"
                @click="$router.push(item.to)"
                 height="150px"
                  >
                    <v-card-text>
                        <div
                            class="font-weight-bold  d-flex align-center"
                            style="font-size:20px"
                        >
                        <v-btn color="#02735E"  fab small  elevation="0">
                            <v-icon v-if="item.icon" color="white">
                                {{ item.icon }}
                            </v-icon>
                        </v-btn>
                           
                           <span class="#034159--text text-center mx-4" style="opacity: 0.9;"> {{ item.title }}</span>
                        </div>
                        <div class="grey--text text-center text--lighten-1 ml-10 my-4">
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
    name: "Reports",
    data() {
        return {
            lists: [
                {
                    title: "ຂໍ້ມູນຜູ້ບໍລີຫານສູງສຸດຂອງລະບົບ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-account",
                    to: "/reports/admin",
                },
                {
                    title: "ຂໍ້ມູນຜູ້ບໍລິຫານຂອງກະຊວງ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-bank",
                    to: "/reports/ministry",
                },
                {
                    title: "ຂໍ້ມູນກົມຈັດຕັ້ງຂອງກະຊວງ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-import",
                    to: "/reports/department",
                },
                {
                    title: "ຂໍ້ມູນພະນັກງານຂອງກົມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-export",
                    to: "/reports/exports",
                },
                {
                    title: "ຂໍ້ມູນພະແນກ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-rotate-left-outline",
                    to: "/reports/return",
                },
                {
                    title: "ຂໍ້ມູນພະນັກງານຂອງພະແນກ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-cash-multiple",
                    to: "/reports/exports",
                },
                {
                    title: "ຂໍ້ມູນຜູ້ບໍລີຫານຂັ້ນທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-cash-minus",
                    to: "/reports/imports",
                },
                {
                    title: "ຂໍ້ມູນພະແນກຂັ້ນທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
                {
                    title: "ຂໍ້ມູນພະນັກງານຂ້ັນທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
                {
                    title: "ຂໍ້ມູນຂະແໜງທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
                {
                    title: "ຂໍ້ມູນຫ້ອງການທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
                {
                    title: "ຂໍ້ມູນໜ່ວຍງານທ້ອງຖີ້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
            ],
        };
    },
};
</script>