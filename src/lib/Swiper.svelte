<script lang="ts">
  import { onMount } from "svelte";
  import { getAllCoords, parseDim, positionChildren } from "./helpers";
  import { cells, children, matrix } from "./stores";
  import {
    onKeydown,
    onMouseEnter,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onWheel
  } from "./handlers";
  import SwipeArrows from "./SwiperArrows.svelte";

  /**
   * Matrix dimensions in `row x col` format
   * >
   * Examples (c means cell)
   *   - `dim="2x1"`
   *     ```
   *     c1
   *     c2
   *     ```
   *   - `dim="1x2"`
   *     ```
   *     c1 c2
   *     ```
   *   - `dim="2x2"`
   *     ```
   *     c1 c2
   *     c3 c4
   *     ```
   */
  export let dim = "";

  /**
   * Matrix cells to omit
   * >
   * Examples (c means cell)
   *   - `dim="2x2" omit={[2]}`
   *     ```
   *     c1 __
   *     c3 c4
   *     ```
   *   - `dim="3x3" omit={[1, 3, 7, 9]}`
   *     ```
   *     __ c2 __
   *     c4 c5 c6
   *     __ c8 __
   *     ```
   */
  export let omit: number[] = [];

  /**
   * Boolean for disabling arrows, default=false
   */
  export let noArrows = false;

  /**
   * Properties to pass to `SwiperArrows` via `$$restProps`
   * >
   * Example:
   *   - change arrow color:
   *     ```
   *     <Swiper dim="2x1" arrowProps={{ class: "fg-white" }} />
   *       ...
   *     </Swiper>
   *     ```
   */
  export let arrowProps: Record<string, any> = null;

  function initializeCells() {
    $children = Array.from($matrix.children);
    if (dim === "") {
      dim = `${$children.length}x1`;
    }
    const { iMax, jMax } = parseDim(dim);
    const allCoords = getAllCoords(iMax, jMax, omit);
    for (const i in allCoords) {
      const baseStyle = $children[i].getAttribute("style")
        + " width: 100%; height: 100%; max-width: 100%; max-height: 100%;"
        + " position: absolute; transition: all 0.3s ease;";
      $cells.push({
        element: $children[i],
        coords: allCoords[i],
        style: {
          base: baseStyle,
          dynamic: ""
        }
      });
    }
  }

  onMount(() => {
    initializeCells();
    positionChildren(-$cells[0].coords.i, -$cells[0].coords.j);
  });
</script>

<div
  id="swiper"
  bind:this={$matrix}
  tabindex="-1"
  role="presentation"
  on:mouseenter={onMouseEnter}
  on:keydown={onKeydown}
  on:wheel={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove={onTouchMove}
  on:touchend={onTouchEnd}
  {...$$restProps}
>
  <slot />

  {#if !noArrows}
    <SwipeArrows {...arrowProps} />
  {/if}
</div>

<style>
  :global(html, body) {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  #swiper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Avoid large images stretching beyond containers */
  :global(#swiper *) {
    max-width: 100%;
    max-height: 100%;
  }
</style>
