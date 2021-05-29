<template>
  <div class="emoji--container">
    <div class="emoji  emoji--like" @click="$emit('onClick', 1)">
      <div class="emoji__hand">
        <div class="emoji__thumb"></div>
      </div>
    </div>
    <div class="emoji  emoji--love" @click="$emit('onClick', 2)">
      <div class="emoji__heart"></div>
    </div>
    <div class="emoji  emoji--haha" @click="$emit('onClick', 3)">
      <div class="emoji__face">
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth">
          <div class="emoji__tongue"></div>
        </div>
      </div>
    </div>
    <div class="emoji  emoji--yay" @click="$emit('onClick', 4)">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
        <div class="emoji__mouth"></div>
      </div>
    </div>
    <div class="emoji  emoji--wow" @click="$emit('onClick', 5)">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth"></div>
      </div>
    </div>
    <div class="emoji  emoji--sad" @click="$emit('onClick', 6)">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth"></div>
      </div>
    </div>
    <div class="emoji  emoji--angry" @click="$emit('onClick', 7)">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth"></div>
      </div>
    </div>
  </div>
</template>
