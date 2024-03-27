<script>
  import { Swiper } from "$lib"; // $lib -> "svelte-swiper-matrix";
</script>

<Swiper dim="3x1">
  <div class="bg-1">
    <!-- Cell 1 Content -->
  </div>

  <div class="bg-2">
    <!-- Cell 2 Content -->
  </div>

  <div class="bg-3">
    <!-- Cell 3 Content -->
  </div>
</Swiper>

<style>
  div {
    width: 100%;
    height: 100%;
  }

  .bg-1 {
    background: url("/apollo-1.jpg") center/cover no-repeat;
  }

  .bg-2 {
    background: url("/apollo-2.jpg") center/cover no-repeat;
  }

  .bg-3 {
    background: url("/apollo-3.jpg") center/cover no-repeat;
  }
</style>
