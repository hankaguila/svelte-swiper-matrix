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
  import SwiperArrows from "./SwiperArrows.svelte";

  /**
   * Matrix dimensions in `row x col` format
   * >
   * Examples (c means cell)
   *   - `dim="2x1"`
   *     ```
   *     1
   *     2
   *     ```
   *   - `dim="1x2"`
   *     ```
   *     1 2
   *     ```
   *   - `dim="2x2"`
   *     ```
   *     1 2
   *     3 4
   *     ```
   */
  export let dim = "";

  /**
   * Matrix cells to omit
   * >
   * Examples:
   *   - `dim="2x2" omit={[2]}`
   *     ```
   *     1 _
   *     3 4
   *     ```
   *   - `dim="3x3" omit={[1, 3, 7, 9]}`
   *     ```
   *     _ 2 _
   *     4 5 6
   *     _ 8 _
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
  export let arrowProps: Record<string, any> = {};

  function initializeCells() {
    $children = Array.from($matrix.children).filter(
      (child) => child.id !== "swiper-arrows"
    );
    if (dim === "") {
      dim = `${$children.length}x1`;
    }
    const { iMax, jMax } = parseDim(dim);
    const allCoords = getAllCoords(iMax, jMax, omit);
    for (const i in allCoords) {
      const baseStyle =
        $children[i].getAttribute("style") +
        " width: 100%; height: 100%; max-width: 100%; max-height: 100%;" +
        " position: absolute; transition: all 0.3s ease;";
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

<!--
@component

A Swiper matrix component
>
Each child is a cell in the matrix. Cells are sequenced left-to-right and
top-to-bottom.
>
Example:
  - `<Swiper dim="2x2">...</Swiper>`
    ```
    1 2
    3 4
    ```

@prop dim {string} - Matrix dimensions
@prop omit {number[]} - Matrix cells to omit
@prop noArrows {boolean} - Boolean for hiding arrows
@prop arrowProps {Record<string, any>} - SwiperArrows $$restProps
-->
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
>
  <slot />

  {#if !noArrows}
    <SwiperArrows {...arrowProps} />
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

  #swiper:focus-visible {
    outline: initial;
  }

  /* Avoid large images stretching beyond containers */
  :global(#swiper *) {
    max-width: 100%;
    max-height: 100%;
  }
</style>
