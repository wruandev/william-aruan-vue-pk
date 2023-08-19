<template>
  <v-container>
    <v-row class="">
      <v-col cols="12">
        <div class="d-flex justify-space-between pl-3 pe-3">
          <h2>Daftar Kelompok</h2>
          <v-btn
            elevation="2"
            @click="toAddGroupPage"
            color="blue-grey darken-1"
            dark
            >Buat Baru</v-btn
          >
        </div>
      </v-col>
      <v-col cols="2"> </v-col>
    </v-row>
    <v-row v-if="!showGroup">
      <v-col class="text-center">
        Belum ada kelompok yang disimpan. Ayo mulai buat sekarang!
      </v-col>
    </v-row>

    <v-row v-if="showGroup">
      <v-col cols="12" sm="6" md="4" v-for="group in groups" :key="group.name">
        <GroupCard :group="group"></GroupCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import GroupCard from "./GroupCard.vue";
export default {
  components: { GroupCard },
  name: "GroupContainer",
  data: function () {
    return {};
  },
  methods: {
    toAddGroupPage: function () {
      this.$router.replace({ name: "add-view" });
    },
  },
  computed: {
    showGroup: function () {
      return this.groups.length > 0;
    },
    ...mapState({
      groups: (state) => state.group.groups,
    }),
  },
};
</script>
