<template>
  <div>
    <v-card
      class="elevation-0 rounded-lg mt-3"
      outlined
      max-height="500"
      scrollable
    >
      <v-card-title> hello </v-card-title>
      <v-card-text>
        <message-list-thresh :loading="false" />
      </v-card-text>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-3" outlined>
      <v-card-title>
        <span class="font-weight-bold">{{ $t('profile.Friends') }}</span>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="grey lighten-2 rounded-lg"
              v-bind="attrs"
              v-on="on"
              text
              @click="friendPrivacyDialog = true"
            >
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('profile.EditPrivacy') }}</span>
        </v-tooltip>
      </v-card-title>
      <v-toolbar color="elevation-0" class="red" dense>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-container>
        {{ user.friends }}
      </v-container>
    </v-card>

    <v-dialog width="650" v-model="friendPrivacyDialog">
      <v-card>
        <v-card-title class="font-weight-bold">
          <v-spacer />
          {{ $t('profile.EditPrivacy') }}
          <v-spacer />
          <v-btn
            class="grey lighten-2"
            @click="friendPrivacyDialog = false"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-container>
          <v-row class="mx-1">
            <v-col cols="9">
              <div class="font-weight-bold">
                {{ $t('profile.FriendsList') }}
              </div>
              <div>
                {{ $t('profile.WhoSeeYourFriend') }}
              </div>
              <div class="text-caption">
                {{ $t('profile.FriendPrivacyCaption') }}
              </div>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="grey lighten-2 text-capitalize font-weight-bold"
                block
                text
                :loading="loadingFriendPrivacy"
                :disabled="loadingFriendPrivacy"
              >
                <v-icon size="15" class="mr-3">mdi-earth</v-icon>
                {{ $t('profile.Friends') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['user'],
  data() {
    return {}
  }
}
</script>
