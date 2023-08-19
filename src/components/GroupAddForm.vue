<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Buat Kelompok Baru</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5">
        <v-form @submit.prevent="" ref="groupForm" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="groupName"
                outlined
                label="Nama Kelompok"
                :rules="groupNameRules"
              ></v-text-field>
              <v-text-field
                v-model="groupCount"
                outlined
                label="Jumlah Kelompok"
                :rules="groupCountRules"
              ></v-text-field>

              <div class="mt-n2 subtitle-1">Pilih warna tag</div>
              <div class="d-flex flex-wrap align-center mb-4">
                <div
                  v-for="tagColor in tagColors"
                  :key="tagColor"
                  :class="{
                    'mr-2': true,
                    'rounded-pill': true,
                    'hover-pointer': true,
                    'tag-active': color === tagColor,
                    'tag-inactive': true,
                  }"
                  @click="changeColor(tagColor)"
                >
                  <v-sheet
                    height="40"
                    width="40"
                    :color="tagColor"
                    class="rounded-pill"
                  ></v-sheet>
                </div>
              </div>

              <v-btn
                x-large
                @click="randomizeGroup"
                color="blue-grey darken-1"
                dark
                >Mulai Bagi Kelompok</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="12" md="7">
        <v-form
          @submit.prevent="addParticipant"
          ref="participantForm"
          v-model="participantFormModel"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="participantName"
                outlined
                label="Nama peserta"
                :rules="participantNameRules"
                @blur="() => $refs.participantForm.resetValidation()"
              ></v-text-field>
              <v-btn
                x-large
                @click="addParticipant"
                color="blue-grey darken-1"
                dark
                class="d-md-none"
                >Tambah Peserta</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                x-large
                @click="addParticipant"
                color="blue-grey darken-1"
                dark
                class="d-none d-md-flex"
                >Tambah Peserta</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col v-if="participantTotal" cols="12" class="text-right">
            Total {{ participantTotal }} Peserta
          </v-col>

          <v-col v-if="!participantTotal" cols="12" class="text-center">
            Belum ada peserta yang ditambahkan
          </v-col>
          <v-col
            cols="12"
            v-for="(participant, idx) in participants"
            :key="participant"
          >
            <v-card>
              <v-card-title class="d-flex justify-space-between text-h5">
                <div>
                  {{ participant }}
                </div>
                <v-btn
                  small
                  @click="removeParticipant(idx)"
                  color="red lighten-2"
                  dark
                >
                  Hapus
                </v-btn>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { distributeGroup } from "@/utils/index.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "GroupAddForm",
  data: function () {
    return {
      participants: [],
      groupName: "",
      groupCount: 1,
      participantName: "",
      tagColors: [
        "blue-grey darken-1",
        "red darken-2",
        "purple darken-2",
        "indigo darken-1",
        "teal darken-1",
        "orange darken-1",
        "brown darken-1",
      ],
      color: "blue-grey darken-1",
      participantFormModel: true,
      participantNameRules: [
        (value) => !!value || "Nama peserta harus diisi",
        (value) =>
          !this.participants.find(
            (p) => p.trim().toLowerCase() === value.trim().toLowerCase()
          ) || "Tidak boleh terdapat nama yang sama",
      ],
      groupNameRules: [(value) => !!value || "Nama Kelompok harus diisi"],
      groupCountRules: [
        (value) => !!value || "Jumlah Kelompok harus diisi",
        (value) =>
          /^[0-9]+$/.test(value) || "Jumlah kelompok harus berupa angka",
        (value) => {
          const isInteger = /^[0-9]+$/.test(value);
          const valueInt = parseInt(value, 10);

          if (isInteger && valueInt > this.participants.length) {
            return "Jumlah kelompok tidak boleh lebih dari jumlah peserta";
          }

          return true;
        },
      ],
    };
  },
  methods: {
    toDetailPage: function (id) {
      this.$router.push({ name: "detail-view", params: { id: id } });
    },
    addParticipant: function () {
      if (!this.$refs.participantForm.validate()) {
        return false;
      }

      if (this.participantName === "") {
        return false;
      }

      const existed = this.participants.find(
        (p) =>
          p.trim().toLowerCase() === this.participantName.trim().toLowerCase()
      );

      if (existed) {
        return false;
      }

      this.participants.push(this.participantName.trim());
      this.participantName = "";
      this.$refs.participantForm.resetValidation();
      this.$refs.groupForm.resetValidation();
    },

    removeParticipant: function (index) {
      this.participants = this.participants.filter((_, i) => i !== index);
    },

    randomizeGroup: function () {
      if (!this.$refs.groupForm.validate()) {
        return false;
      }

      if (!this.groupName) {
        return false;
      }

      if (!this.participants.length) {
        return false;
      }

      if (this.participants.length < this.groupCount) {
        return false;
      }

      const newArray = distributeGroup(
        this.participants,
        this.groupCountInteger
      );

      const newGroupData = {
        id: Date.now().toString(),
        added: Date.now(),
        name: this.groupName,
        teams: [...newArray],
        color: this.color,
      };

      const newGroupStore = [...this.groupStore, newGroupData];

      this.setGroupStore(newGroupStore);

      this.toDetailPage(newGroupData.id);
    },
    changeColor: function (color) {
      this.color = color;
    },
    ...mapMutations({
      setGroupStore: "group/setGroups",
    }),
  },
  computed: {
    participantTotal: function () {
      return this.participants.length;
    },
    groupCountInteger: function () {
      return parseInt(this.groupCount, 10);
    },
    ...mapState({
      groupStore: (state) => state.group.groups,
    }),
  },
};
</script>

<style scoped>
.hover-pointer:hover {
  cursor: pointer;
}

.tag-active {
  border: 4px solid black !important;
}

.tag-inactive {
  border: 4px solid transparent;
}
</style>
