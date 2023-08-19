<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ group.name }}</h1>
        <v-divider />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" v-for="(team, idx) in group.teams" :key="idx">
        <v-card class="mx-auto" tile>
          <v-list disabled>
            <v-subheader class="justify-space-between">
              <div>Tim {{ idx + 1 }}</div>
              <v-chip>{{ team.length }} Anggota</v-chip>
            </v-subheader>

            <v-list-item-group color="primary">
              <v-list-item v-for="(member, memberIdx) in team" :key="memberIdx">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ member }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GroupDetail",
  computed: {
    groupId: function () {
      return this.$route.params.id;
    },
    group: function () {
      return this.$store.state.group.groups.find((g) => g.id === this.groupId);
    },
  },
};
</script>
