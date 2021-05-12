<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link to="/about" class="nav-link">
            About Us
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/blog">
            Blog
          </nuxt-link>
        </li>
      </ul>
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by

        <a href="https://fb.com/hieptv98" target="_blank" rel="noopener">
          Hiệp Trần
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style></style>
