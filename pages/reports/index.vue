<template>
    <div>
        <div class="text-h6 font-weight-bold mb-3">ການລາຍງານ</div>
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
                            class="font-weight-bold text-h6 d-flex align-center"
                        >
                            <v-icon v-if="item.icon" small left>
                                {{ item.icon }}
                            </v-icon>
                            {{ item.title }}
                        </div>
                        <div class="text-subtitle-2 grey--text text--lighten-1">
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
                    title: "ຂໍ້ມູນພະນັກງານ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-account",
                    to: "/reports/members",
                },
                {
                    title: "admin",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-book",
                    to: "/reports/books",
                },
                {
                    title: "super admin",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-import",
                    to: "/reports/imports",
                },
                {
                    title: "ປື້ມຢືມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-export",
                    to: "/reports/exports",
                },
                {
                    title: "ສົ່ງປື້ມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-rotate-left-outline",
                    to: "/reports/return",
                },
                {
                    title: "ລາຍຮັບ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-cash-multiple",
                    to: "/reports/exports",
                },
                {
                    title: "ລາຍຈ່າຍ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-cash-minus",
                    to: "/reports/imports",
                },
                {
                    title: "ການປັບໄຫມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-alert",
                    to: "/fine",
                },
            ],
        };
    },
};
</script>