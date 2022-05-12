## Overview

Minimal app that _does_ use Sass, JS modules, and modern JS libraries, and does _not_ require a JS build system or a server. Once built, can be distributed as a folder.

## Dependencies

Package manager and `make` as described in `../readme.md`.

Additional: `sass`.

## Usage

`cd` to this directory, then:

    make deps
    make

To prepare for deployment:

    make build
