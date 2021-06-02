## Overview

Minimal site that uses JS and Sass to generate HTML and CSS files.

The output folder can be served by GitHub Pages, which automatically resolves `/` to `index.html`, and missing URLs to `404.html`.

Difference from the previous example: in development, this generates responses on-the-fly, without writing HTML to disk. For deployment, all pages are generated as files. This is more complex, but also more scalable: the time to restart the server and reload a single page remains fixed, even as your site grows.

`browser.mjs` _can_ use JS modules and modern libraries, and does _not_ require a JS build system.

## Dependencies

Package manager and `make` as described in `../readme.md`.

Additional: `sass`, `node`, `watchexec`.

## Usage

`cd` to this directory, then:

    make deps
    make

To prepare for deployment:

    make build
