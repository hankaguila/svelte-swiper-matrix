# svelte-swiper-matrix

A minimal swiper for Svelte

[![npm-version](https://img.shields.io/npm/v/svelte-swiper-matrix.svg)](https://www.npmjs.com/package/svelte-swiper-matrix)
[![npm bundle size](https://img.shields.io/bundlephobia/min/svelte-swiper-matrix.svg)](https://www.npmjs.com/package/svelte-swiper-matrix)

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)

## Features

- Intuitive matrix layout
- No buttons, 🔔 or 🎉; swipe with arrow keys, mouse wheel 
  (vertical) or swiping gestures (mobile)
- Extremely simple; one component, 1-2 props, go

## Install

```sh
npm i svelte-swiper-matrix
```
## Usage

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

- Each `Swiper` child is positioned in the next available matrix cell; make 
  sure the number of children matches the matrix size minus the omitted 
  cells count (`(rows * cols) - omittedCount`)
- In general, `Swiper` children should be fully sized containers

## Props

| Prop Name      | Type                    | Default Value            | Description                     |
|----------------|-------------------------|--------------------------|---------------------------------|
| `dim`          | `string`                | `"${children.length}x1"` | Matrix `row x col` dimensions   |
| `omit`         | `number[]`              | `[]`                     | Matrix cells to omit            |
| -------------- | ----------------------- | ------------------------ | ------------------------------- |
| `noArrows`     | `boolean`               | `false`                  | Boolean for hiding arrows       |
| `...`          | `Record<string, any>`   | `undefined`              | Swiper `$$restProps`            |
| `arrowProps`   | `Record<string, any>`   | `undefined`              | SwiperArrows `$$restProps`      |

> Props after the divider are for experimental or edge cases, ignore them gladly

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
