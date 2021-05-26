<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8"><user-edit :currentUser="user"> </user-edit></div>
      <div class="col-md-4"><user-card> </user-card></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user',
  middleware: 'checkUrl'
}
</script>
<style></style>
