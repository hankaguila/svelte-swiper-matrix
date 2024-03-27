<script>
  import { Swiper } from "$lib";
  import AppToolbar from "$widgets/AppToolbar.svelte";
</script>

<header>
  <AppToolbar />
</header>

<Swiper dim="2x2" omit={[3]}>
  <article class="bg-1" />
  <article class="bg-2" />
  <article class="bg-4" />
</Swiper>

<style>
  :global(html, body) {
    color: white;
  }

  header {
    position: fixed;
    z-index: 1;
    width: 100%;
  }

  article {
    display: grid;
    justify-items: center;
    width: 100%;
    height: 100%;
  }

  .bg-1 {
    background: url("/reventon-1.jpg") center/cover no-repeat;
  }

  .bg-2 {
    background: url("/reventon-2.jpg") center/cover no-repeat;
  }

  .bg-4 {
    background: url("/sc20-1.jpg") center/cover no-repeat;
  }
</style>
