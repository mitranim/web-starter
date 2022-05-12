## Overview

Minimal site that uses JS and Sass to generate HTML and CSS files. Does not require an HTTP server. The output can be distributed as a folder.

## Dependencies

Package manager and `make` as described in `../readme.md`.

Additional: `sass`, `deno`.

## Usage

`cd` to this directory, then:

    make deps
    make

To prepare for deployment:

    make build
