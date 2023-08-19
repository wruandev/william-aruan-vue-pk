<template>
  <v-app>
    <v-app-bar app padless flat color="white">
      <v-btn text :class="{ 'd-none': showBackNavigation }" @click="goBack">
        <v-icon left>mdi-arrow-left</v-icon> <span>Kembali</span>
      </v-btn>
      <v-tabs centered class="ml-n6" color="grey darken-1">
        <!-- Bagi Kelompok -->
        <v-tab disabled><span class="subtitle-1">Bagi kelompok</span></v-tab>
        <v-tab
          @click="redirectLink(link.url)"
          v-for="link in links"
          :key="link.name"
          :tab-value="link.url"
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="mt-4">
      <router-view />
    </v-main>

    <v-footer :padless="true" class="justify-center pt-5 mt-5">
      <p>&copy; 2023 - Created by William</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    links: [
      { name: "Dashboard", url: "home" },
      { name: "About", url: "about" },
    ],
  }),
  methods: {
    redirectLink: function (url) {
      if (url !== this.$route.name) {
        this.$router.push({ name: url });
      }
    },
    goBack: function () {
      this.$router.replace({ name: "home" });
    },
  },
  computed: {
    showBackNavigation: function () {
      return this.$route.name === "home" || this.$route.name === "about";
    },
  },
};
</script>
