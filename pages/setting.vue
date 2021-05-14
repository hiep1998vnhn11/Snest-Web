<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-app-bar-nav-icon @click.stop="drawer = true"></v-app-bar-nav-icon>
        <v-navigation-drawer
          v-model="drawer"
          width="350"
          fixed
          class="mt-16 pl-16 pr-3"
        >
          <v-sheet class="pa-4">
            <div class="font-weight-bold text-h6">Settings</div>
          </v-sheet>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              v-for="[icon, text, name] in links"
              :key="name"
              link
              :to="localePath({ name: name })"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="12" md="8">
        <v-container fluid>
          <nuxt-child />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-cog-outline', 'Regular', 'setting-account'],
        ['mdi-shield-account-outline', 'Security', 'setting-security'],
        ['mdi-information-outline', 'Your information', 'setting-info'],
        ['mdi-account-lock-outline', 'Privacy', 'setting-privacy']
      ]
    }
  }
}
</script>

<style></style>
