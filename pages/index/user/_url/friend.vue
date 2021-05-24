<template>
  <div>
    <v-card class="elevation-0 rounded-lg mt-3" outlined>
      <v-card-title>
        <span class="font-weight-bold">{{ $t('profile.Friends') }}</span>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('Search')"
          outlined
          dense
          autocomplete="off"
          rounded
          single-line
          hide-details
          @input="searchFriend"
        />
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
      <v-toolbar color="elevation-0" dense>
        <v-tabs v-model="tab" align-with-title>
          <v-tab
            v-for="item in items"
            :key="item"
            :href="`#${item}`"
            class="text-capitalize"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-container>
        <v-tabs-items v-model="tab">
          <v-tab-item :value="'all'">
            <v-container
              v-if="!user.friends.length || (!friends.length && search)"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!user.friends.length">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
                v-for="friend in search ? friends : user.friends"
                :key="`friend-${friend.id}`"
                style="position: relative;"
              >
                <v-card height="120">
                  <v-row class="pa-6">
                    <v-avatar size="80" class="rounded-lg">
                      <v-img :src="friend.user_friend.profile_photo_path" />
                    </v-avatar>
                    <div class="my-auto ml-4">
                      <div class="font-weight-bold">
                        {{ friend.user_friend.name }}
                      </div>
                      <div>11 {{ $t('profile.MutualFriends') }}</div>
                    </div>
                    <div
                      class="my-auto mx-auto"
                      style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"
                    >
                      <v-btn
                        class="text primary text-capitalize"
                        @click="onShowFriendTransition"
                      >
                        {{ $t('Friend') }}
                      </v-btn>
                    </div>
                    <div class="show-friend-bar">
                      <v-expand-transition right>
                        <v-card
                          v-click-outside="{
                            handler: onClickOutsideWithConditional,
                            closeConditional
                          }"
                          v-show="expand"
                          width="350"
                          class="mx-auto"
                        >
                          <v-container v-if="loading">
                            <v-btn block disabled loading text></v-btn>
                          </v-container>
                          <div class="pa-2" v-else>
                            <v-btn
                              text
                              block
                              class="text-capitalize"
                              @click="onFavorite"
                            >
                              <v-icon v-if="favorite">mdi-star-outline</v-icon>
                              <v-icon v-else color="primary">mdi-star</v-icon>
                              <span class="ml-3">
                                {{ $t('profile.Favorite') }}
                              </span>
                              <v-spacer />
                            </v-btn>
                            <v-btn text block class="text-capitalize">
                              <v-icon>mdi-account-cancel-outline</v-icon>
                              <span class="ml-3">
                                {{ $t('profile.Unfriend') }}
                              </span>
                              <v-spacer />
                            </v-btn>
                          </div>
                        </v-card>
                      </v-expand-transition>
                    </div>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="recent">
            <v-container
              v-if="!friends.length"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!search">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <profile-show-friend v-else :friends="friends" />
          </v-tab-item>
          <v-tab-item value="birthday">
            <v-container
              v-if="!friends.length"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!search">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <show-friend v-else :friends="friends" />
          </v-tab-item>
          <v-tab-item value="work">
            <v-container
              v-if="!friends.length"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!search">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <show-friend v-else :friends="friends" />
          </v-tab-item>
          <v-tab-item value="college">
            <v-container
              v-if="!friends.length"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!search">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <show-friend v-else :friends="friends" />
          </v-tab-item>
          <v-tab-item value="current city">
            <v-container
              v-if="!friends.length"
              class="text-center text-h5 text--disabled"
            >
              <span v-if="!search">
                {{ $t('profile.HaveNoFriend') }}
              </span>
              <span v-else>{{ $t('NoResultFor') }} {{ search }}</span>
            </v-container>
            <show-friend v-else :friends="friends" />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
    <v-card height="300" class="mt-3"></v-card>

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
    {{ user.friends }}
    <auth-footer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      friendPrivacyDialog: false,
      loadingFriendPrivacy: false,
      changeFriendPrivacy: false,
      tab: 'all',
      items: ['all', 'recent', 'birthday', 'work', 'college', 'current city'],
      loading: false,
      expand: false,
      favorite: false,
      search: '',
      friends: []
    }
  },
  props: ['user'],
  methods: {
    onClickOutsideWithConditional() {
      this.expand = false
    },
    closeConditional(e) {
      return this.expand
    },
    onShowFriendTransition() {
      if (this.expand || this.loading) this.expand = !this.expand
      this.expand = this.loading = true
      const vm = this
      setTimeout(() => {
        vm.loading = false
      }, 3000)
    },
    onFavorite() {
      this.favorite = !this.favorite
    },
    onUnfriend() {},
    searchFriend() {
      this.friends = this.user.friends.filter(friend => {
        return (
          friend.user_friend.name
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) !== -1
        )
      })
    },
    onChangeTab() {
      switch (this.tab) {
        case 'all':
          this.friends = this.user.friends
          break
        case 'recent':
          this.friends = this.user.friends.filter(friend => {
            return friend.user_friend.id !== -1
          })
          break
        case 'birthday':
          this.friends = this.user.friends.filter()
          break
        case 'work':
          this.friends = this.user.friends.filter()
          break
        case 'college':
          this.friends = this.user.friends.filter()
          break
        case 'current city':
          this.friends = this.user.friends.filter()
          break
      }
    }
  },
  watch: {
    tab: 'onChangeTab'
  }
}
</script>
<style scoped>
.show-friend-bar {
  position: absolute;
  z-index: 100;
  top: 100px;
  right: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
  position: absolute;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
