<div align="center">

# Dithering Shader

### Real-time ordered dithering as a post-processing effect for 3D scenes, built with React Three Fiber

[![Live demo](https://img.shields.io/badge/Live-demo-000000?style=flat-square)](https://dithering.niccolofanton.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/niccolofanton/dithering-shader?style=flat-square)](https://github.com/niccolofanton/dithering-shader/stargazers)

**[Open the live demo →](https://dithering.niccolofanton.dev)**

</div>

## What it does

This project applies a classic **ordered (Bayer) dithering** effect to a rendered Three.js scene
as a full-screen post-processing pass. The scene renders a 3D model with custom environment-map
lighting, and a GLSL shader pixelates the frame and quantizes brightness through a 4x4 dither
matrix to produce the retro halftone look. Key parameters are exposed through an on-screen
[Leva](https://github.com/pmndrs/leva) control panel so you can tweak the effect in real time.

## Quick start

Requires Node.js and [Yarn](https://yarnpkg.com/) (a `yarn.lock` is committed).

```bash
git clone https://github.com/niccolofanton/dithering-shader.git
cd dithering-shader
yarn install
yarn start
```

Then open the local dev server printed in your terminal. To create a production build:

```bash
yarn build
```

## How the shader works

The dithering pass (`src/dithering-shader/`) runs after the scene is rendered:

1. The frame is **pixelated** according to the grid size and pixel-size ratio.
2. **Luminance** is computed per pixel.
3. The pixel position is mapped into a **4x4 Bayer threshold matrix**; the brightness is compared
   against the matrix value to decide whether the pixel is drawn or knocked out.
4. The result can be rendered in **grayscale or color**.

Bloom can be added **before** (pre-dithering) and/or **after** (post-dithering) the dither pass,
chaining `postprocessing` effect passes through an `EffectComposer`.

## Features

- Custom ordered-dithering effect using a 4x4 Bayer matrix
- Adjustable dithering grid resolution and pixelation strength
- Grayscale-only or color mode toggle
- Independent pre- and post-dithering bloom passes
- Live tweaking of grid resolution, pixelation strength, grayscale mode, and the bloom passes via Leva controls
- 3D model lit with a custom environment map
- Responsive, full-window canvas

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/) via [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei)
- [postprocessing](https://github.com/pmndrs/postprocessing) for the effect composer
- [Leva](https://github.com/pmndrs/leva) for the controls panel
- Create React App (configured with [craco](https://github.com/dilanx/craco))

## Credits

- 3D Model: [Jousting Helmet](https://sketchfab.com/3d-models/jousting-helmet-a4eea31d9d9441af9434a7da5ae46b54) by The Royal Armoury, CC-BY-4.0
- Original dithering pattern by [Klems](https://www.shadertoy.com/user/Klems) on [Shadertoy](https://www.shadertoy.com/view/ltSSzW)
- Environment lighting inspired by [@0xca0a](https://x.com/0xca0a/status/1857444050707640651)

## License

Released under the [MIT License](LICENSE).
</content>
</invoke>
