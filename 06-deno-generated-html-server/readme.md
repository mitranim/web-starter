## Overview

Minimal site that uses JS and Sass to generate HTML and CSS files. For development, it uses a tiny local server to emulate a hosting service for static sites, such as GitHub Pages.

The output folder can be served by GitHub Pages, which automatically resolves `/` to `index.html`, and missing URLs to `404.html`.

`browser.mjs` _can_ use JS modules and modern libraries, and does _not_ require a JS build system.

## Dependencies

Package manager and `make` as described in `../readme.md`.

Additional: `sass`, `deno`.

## Usage

`cd` to this directory, then:

    make deps
    make

To prepare for deployment:

    make build
