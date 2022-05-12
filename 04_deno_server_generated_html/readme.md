## Overview

Minimal site that uses JS and Sass to generate HTML and CSS files. In development it uses a tiny local server to emulate a hosting service for static sites, such as GitHub Pages.

The `target` folder can be served by GitHub Pages, which automatically resolves "clean" URLs to `.html` files. By convention, `/` is `index.html` and unknown URLs are `404.html`.

`browser.mjs` _can_ use JS modules and modern libraries, and does _not_ require a JS build system.

In development, this server generates responses on-the-fly, without writing HTML to disk. For deployment, all files are generated at once. This is scalable: the time to restart the server and reload a single page remains constant even as your site grows.

## Dependencies

Package manager and `make` as described in `../readme.md`.

Additional: `sass`, `deno`.

## Usage

`cd` to this directory, then:

    make deps
    make

To prepare for deployment:

    make build
