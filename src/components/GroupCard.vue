<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">{{ createdAt }}</div>
        <v-list-item-title class="text-h5 mb-1">
          {{ group.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ this.memberNames }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="30" :color="tagColor"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn class="mr-2" outlined rounded text @click="goToDetail">
        <v-icon left>mdi-arrow-top-right-thick</v-icon>
        Detail
      </v-btn>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            rounded
            text
            color="red lighten-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-delete-outline</v-icon>
            Hapus
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5"> Yakin untuk menghapus? </v-card-title>
          <v-card-text>
            Data yang sudah dihapus tidak akan dapat dikembalikan lagi.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false"> Batal </v-btn>
            <v-btn color="red lighten-2" text @click="deleteGroup">
              Ya, Hapus
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.locale("id");
dayjs.extend(relativeTime);

export default {
  name: "GroupCard",
  data: function () {
    return {
      dialog: false,
    };
  },
  computed: {
    memberNames: function () {
      const flatGroup = this.group.teams.reduce((prev, cur) => {
        return [...prev, ...cur];
      }, []);

      return flatGroup.join(", ");
    },
    createdAt: function () {
      const date = dayjs(this.group.added);

      return date.fromNow();
    },
    tagColor: function () {
      return this.group.color ? this.group.color : "blue-grey darken-1";
    },
    ...mapState({
      groupStore: (state) => state.group.groups,
    }),
  },
  methods: {
    goToDetail() {
      this.$router.push({ name: "detail-view", params: { id: this.group.id } });
    },
    deleteGroup() {
      const state = this.groupStore.filter((g) => g.id !== this.group.id);
      this.setGroupStore(state);
      this.dialog = false;
    },
    ...mapMutations({
      setGroupStore: "group/setGroups",
    }),
  },
  props: {
    group: Object,
  },
};
</script>
