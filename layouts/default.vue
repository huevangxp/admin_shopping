<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="role == 'super_admin'"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="250"
      fixed
      app
      color="white"
      >
      <!-- dark -->
      <v-btn
        icon
        class="ml-1"
        x-large
        color="white"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-card v-if="miniVariant == false" elevation="0">
        <v-card-title class="d-flex justify-center">
          <v-avatar size="102" color="primary">
            <v-avatar size="100">
              <v-img :src="profile" alt="image"></v-img>
            </v-avatar>
          </v-avatar>
        </v-card-title>
      </v-card>
      <v-list v-for="(item, i) in items" :key="i" dense class="py-0" tile flat>
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          no-action
          dark
          active-class="primary white--text"
        >
          <template #activator>
            <v-list-item-title class="py-2">{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(subItem, subI) in item.children"
            :key="subI"
            exact
            :to="subItem.to"
            link
            active-class="primary white--text"
          >
            <v-list-item-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title class="py-2" style="font-size: 14px">{{
              subItem.title
            }}</v-list-item-title>
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
            <v-list-item-title class="font-weight-bold" style="font-size: 14px">
              {{ item.title }}
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
      >
      <!-- color="primary"
      dark -->
      <v-avatar size="60" color="white" v-if="role == 'super_admin'">
        <v-img lazy-src="/loading.gif" src="/logo.png" alt="alt" />
      </v-avatar>
      <v-avatar size="60" color="white" v-else>
        <v-img lazy-src="/loading.gif" :src="profile" alt="alt" />
      </v-avatar>
      <v-toolbar-title v-if="role == 'super_admin'" class="ml-3">ອົງການທີ່ຂື້ນກັບລັດຖະບານ</v-toolbar-title>
      <v-toolbar-title  v-else class="ml-3">{{ title }}</v-toolbar-title>
      <v-spacer />
      <div class="mx-4">version {{ VERSION }}</div>
      <div class="d-flex">
        <p class="mt-4" style="border-bottom: 1px solid #fff">ຜູ້ໃຊ້ລະບົບ:</p>
        <v-tab @click="$router.push(`/dashboard/admin/${id}`)">
        <v-badge
          color="primary"
          dot>
        <span class="font-weight-bold">{{ name }}</span>
        </v-badge>
      </v-tab>
        
      </div>
      <v-btn outlined icon class="ml-4" @click="logout()">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title primary-title class="primary white--text">
          ອອກຈາກລະບົບ
        </v-card-title>

        <v-card-text class="d-flex justify-center py-10">
          ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ່?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dense @click="dialog = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn color="primary" dense dark @click="confirmLogout()"
            >ອອກຈາກລະບົບ</v-btn
          >
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
      VERSION:'0.0.2',
      dialog: false,
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: true,
      name: this.$cookies.get("name"),
      id: this.$cookies.get('userId'),
      lastName: this.$cookies.get("lastName"),
      profile: this.$cookies.get("profile"),
      role: this.$cookies.get("role"),
      title: this.$cookies.get('title'),
      items: [
        // {
        //   icon: "mdi-tablet-dashboard",
        //   title: "ອົງການທີ່ຂື້ນກັບລັດຖະບານ",
        //   to: "/",
        // },
        {
          icon: "mdi-database",
          title: "ຈັດການຂໍ້ມູນພື້ນຖາມ",
          to: "/",
        },
        {
          icon: "mdi-database",
          title: "ຈັດການ admin ກະຊວງ",
          to: "/dashboard/adminMinistry",
        },
        {
          icon: "mdi-database",
          title: "ຈັດການ admin ທ້ອງຖີ້ມ",
          to: "/dashboard/adminRarul",
        },
        {
          icon: "mdi-bank",
          title: "ສູນກາງ",
          // to: "/ministry",
          children: [
            {
              icon: "mdi-bank-circle",
              title: "ກະຊວງ",
              to: "/ministry",
            },
            {
              icon: "mdi-bank-outline",
              title: "ອົງການທຽບເທົ່າກະຊວງ",
              to: "/ministryAgency",
            },
          ],
        },
        {
          icon: "mdi-home-city-outline",
          title: "ຈັດການທ້ອງຖິ້ມ",
          to: "/rural",
          // children: [
          //   {
          //     title: "ກະຊວງ",
          //   },
          //   {
          //     title: "ອົງການທຽບເທົ່າກະຊວງ",
          //   },
          // ]
        },

        {
          icon: "mdi-chart-box",
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
      this.$cookies.remove("title");
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
