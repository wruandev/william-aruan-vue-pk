<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12" md="6" offset-md="3">
        <h1 class="text-center">Bagi Kelompok</h1>
        <p class="text-center">&copy; 2023</p>
        <p class="text-center">
          Mempermudah kamu untuk membuat kelompok dan manajemen kelompok.
        </p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Repository Link</td>
                <td>
                  <a href="https://github.com/wruandev/william-aruan-vue-pk"
                    >https://github.com/wruandev/william-aruan-vue-pk</a
                  >
                </td>
              </tr>
              <tr>
                <td>Website Link</td>
                <td><a href="https://william-aruan-vue-pk.vercel.app">https://william-aruan-vue-pk.vercel.app</a></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
