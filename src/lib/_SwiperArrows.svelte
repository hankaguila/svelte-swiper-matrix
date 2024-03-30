<script lang="ts">
  import { fade } from "svelte/transition";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { arrowsRerenderTrigger, nextMoves } from "./stores";

  const arrowSpring = spring(0, { stiffness: 0.1, damping: 0.1 });

  function toggleArrowSpring() {
    $arrowSpring = -0.25;
    setTimeout(() => ($arrowSpring = 0.5), 250);
    setTimeout(() => ($arrowSpring = 0), 500);
  }

  onMount(() => {
    setTimeout(() => toggleArrowSpring(), 1000);
  });
</script>

{#key $arrowsRerenderTrigger}
  <div
    id="swiper-arrows"
    in:fade={{ delay: 300, duration: 500 }}
    {...$$restProps}
  >
    {#if $nextMoves.up}
      <span
        class="material-symbols-outlined up"
        style="transform: translateY(-{$arrowSpring}rem)"
      >
        expand_less
      </span>
    {/if}

    {#if $nextMoves.right}
      <span
        class="material-symbols-outlined right"
        style="transform: translateX({$arrowSpring}rem)"
      >
        chevron_right
      </span>
    {/if}

    {#if $nextMoves.down}
      <span
        class="material-symbols-outlined down"
        style="transform: translateY({$arrowSpring}rem)"
      >
        expand_more
      </span>
    {/if}

    {#if $nextMoves.left}
      <span
        class="material-symbols-outlined left"
        style="transform: translateX(-{$arrowSpring}rem)"
      >
        chevron_left
      </span>
    {/if}
  </div>
{/key}

<style>
  span {
    user-select: none;
    position: absolute;
    display: grid;
  }

  .up {
    top: 0.5rem;
    justify-items: center;
    width: 100%;
  }

  .right {
    right: 0.5rem;
    align-items: center;
    height: 100%;
  }

  .down {
    bottom: 0.5rem;
    justify-items: center;
    width: 100%;
  }

  .left {
    left: 0.5rem;
    align-items: center;
    height: 100%;
  }
</style>
