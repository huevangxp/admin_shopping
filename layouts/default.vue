<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="250"
      fixed
      app
    >
      <v-btn
        icon
        class="ml-1"
        x-large
        color="primary"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-list v-for="(item, i) in items" :key="i" dense class="py-0" tile flat>
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          no-action
          color="primary"
          dark
        >
          <template #activator>
            <v-list-item-title
              class="py-2"
              style="font-size: 18px; color: black; font-weight: bold"
              >{{ item.title }}</v-list-item-title
            >
          </template>
          <v-list-item
            v-for="(subItem, subI) in item.children"
            :key="subI"
            exact
            :to="subItem.to"
            link
          >
            <v-list-item-title
              class="py-2"
              style="font-size: 18px; color: black"
              >{{ subItem.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="item.to"
          router
          exact
          dense
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span style="font-size: 18px; color: black; font-weight: bold">{{
                item.title
              }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="0"
      color="primary"
      dark
    >
      <v-avatar size="50" color="red">
        <v-img
          lazy-src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
          alt="alt"
        />
      </v-avatar>
      <v-toolbar-title class="ml-3">{{ name }} {{ lastName }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout()"> <v-icon>mdi-power</v-icon> </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- persistent :overlay="false" -->
    <v-dialog v-model="dialog" max-width="500px">
      <!-- transition="dialog-transition" -->
      <v-card>
        <v-card-title primary-title> ອອກຈາກລະບົບ </v-card-title>
        <!-- <v-divider></v-divider> -->
        <v-card-text class="d-flex justify-center py-10">
          ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ່?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dense @click="dialog = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn color="primary" dense dark @click="confirmLogout()">ອອກຈາກລະບົບ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: "auth",
  data() {
    return {
      dialog: false,
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: true,
      name: this.$cookies.get("name"),
      lastName: this.$cookies.get("lastName"),
      profile: this.$cookies.get("profile"),
      items: [
        {
          icon: "mdi-monitor-dashboard",
          title: "ອົງການທີ່ຂື້ນກັບລັດຖະບານ",
          to: "/",
        },
        {
          icon: "mdi-cog",
          title: "ສູນກາງ",
          to: "/ministry",
          // children: [
          //   {
          //     title: "ກະຊວງການຕ່າງປະເທດ",
          //     to: "/ministry",
          //   },
          //   {
          //     title: "ກະຊວງຍຸຕິທໍາ",
          //     to: "/login",
          //   },
          //   {
          //     title: "ກະຊວງພາຍໃນ",
          //     to: "/rural",
          //   },
          //   {
          //     title: "ກະຊວງສຶກສາທິການ ແລະ ກິລາ",
          //   },
          //   {
          //     title: "ກະຊວງສາທາລະນະສຸກ",
          //   },
          //   {
          //     title: "ກະຊວງຖະແຫຼງຂ່າວ, ວັດທະນະທໍາ ແລະ ທ່ອງທ່ຽວ",
          //   },
          //   {
          //     title: "ກະຊວງແຮງງານ ແລະ ສະຫວັດດີການສັງຄົມ",
          //   },
          //   {
          //     title: "ກະຊວງແຜນການ ແລະ ການລົງທຶນ",
          //   },
          //   {
          //     title: "ກະຊວງການເງິນ",
          //   },
          //   {
          //     title: "ກະຊວງກະສິກໍາ ແລະ ປ່າໄມ້",
          //   },
          //   {
          //     title: "ກະຊວງຊັບພະຍາກອນທໍາມະຊາດ ແລະ ສິ່ງແວດລ້ອມ",
          //   },
          //   {
          //     title: "ກະຊວງພະລັງງານ ແລະ ບໍ່ແຮ່",
          //   },
          //   {
          //     title: "ກະຊວງອຸດສາຫະກໍາ ແລະ ການຄ້າ",
          //   },
          //   {
          //     title: "ກະຊວງໂຍທາທິການ ແລະ ຂົນສົ່ງ",
          //   },
          //   {
          //     title: "ກະຊວງເຕັກໂນໂລຊີ ແລະ ການສື່ສານ",
          //   },
          //   {
          //     title: "ຫ້ອງວ່າການສໍານັກງານນາຍົກລັດຖະມົນຕີ",
          //   },
          //   {
          //     title: "ທະນາຄານແຫ່ງ ສປປ ລາວ",
          //   },
          // ],
        },
        {
          icon: "mdi-face-agent",
          title: "ຈັດການທ້ອງຖິ້ມ",
          to: "/rural",
          // children: [
          //   {
          //     title: "ນະຄອນຫຼວງວຽງຈັນ",
          //   },
          //   {
          //     title: "ແຂວງວຽງຈັນ",
          //   },
          //   {
          //     title: "ຮັບສັ່ງຊື້ແລ້ວ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          //   {
          //     title: "ຊຳລະສຳເລັດ",
          //   },
          // ],
        },

        // {
        //   icon: "mdi-sim",
        //   title: "sims-master",
        // },
        {
          icon: "mdi-poll",
          title: "ລາຍງານ",
          to: "/reports",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.dialog = true;
    },
    confirmLogout() {
      this.$cookies.remove("name");
      this.$cookies.remove("lastName");
      this.$cookies.remove("phone");
      this.$cookies.remove("role");
      this.$cookies.remove("userId");
      this.$cookies.remove("email");
      this.$cookies.remove("profile");
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
* {
  font-family: "Noto Sans Lao Looped", sans-serif;
  /* font-size:40px */
}
</style>
