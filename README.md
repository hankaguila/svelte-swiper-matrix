# svelte-swiper-matrix

[![npm-version](https://img.shields.io/npm/v/svelte-swiper-matrix.svg)](https://www.npmjs.com/package/svelte-swiper-matrix)
[![npm-downloads](https://img.shields.io/npm/dm/svelte-swiper-matrix.svg)](https://npmcharts.com/compare/svelte-swiper-matrix?minimal=true)

A minimal swiper for Svelte

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)

## Features

- Intuitive matrix layout
- One component, few-to-no props
- No 🔔 or 🎉; just swipe (mobile) or use arrow keys / mouse wheel

## Install

```sh
npm i svelte-swiper-matrix
```

## Usage

To properly display swiper arrows, add the following to `*.css`:

```css
@import "material-symbols";
```

Or `*.svelte`;

```svelte
<script>
  import "material-symbols";
</script>
```

Then, simply do something like this:

```svelte
<script>
  import { Swiper } from "svelte-swiper-matrix";
</script>

<Swiper dim="2x1>
  <div class="full-size">...</div>
  <div class="full-size">...</div>
</Swiper>

<style>
  .full-size {
    width: 100%;
    height: 100%;
  }
</style>
```

- Each `Swiper` child is positioned in the next available matrix cell
- In general, `Swiper` children should be fully sized containers

> ✅ `dim` prop can actually be omitted for one-column matrices like `2x1`,
> `3x1`, etc.

> ⚠️ Make sure the number of Swiper children `==` the number of available matrix
> cells

## Props

| Prop Name    | Type                  | Default Value            | Description                   |
| ------------ | --------------------- | ------------------------ | ----------------------------- |
| `dim`        | `string`              | `"${children.length}x1"` | Matrix `row x col` dimensions |
| `omit`       | `number[]`            | `[]`                     | Matrix cells to omit          |
| `noArrows`   | `boolean`             | `false`                  | Boolean for hiding arrows     |
| `arrowProps` | `Record<string, any>` | `{}`                     | `SwiperArrows.$$restProps`    |

> Technically, all props are optional

## Examples

- [3x1](src/widgets/ExampleA.svelte)

  ```
  <Swiper dim="3x1">
    ...
  </Swiper>
  ```

  ![3x1](/docs/3x1.png)
  ![3x1](/docs/3x1.gif)

- [2x2](src/widgets/ExampleB.svelte)

  ```
  <Swiper dim="2x2" omit={[3]}>
    ...
  </Swiper>
  ```

  ![2x2](/docs/2x2.png)
  ![2x2](/docs/2x2.gif)

> Car images source: https://www.wsupercars.com/

## License

[MIT](LICENSE)
