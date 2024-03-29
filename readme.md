## Overview

"Starter templates" for minimal web apps, from the simplest (one HTML file) to more complex, such as SSR+SPA hybrids. Work in progress, more examples are being added.

Important qualities:

* Minimal. No layers of crap. No hundreds-of-megabytes of JS dependencies.
* Fast. Nothing slowing you down.
* Modern. Avoid obsolete patterns and tech.
* Nice developer experience. No weird bullshit in your way. Watch-and-restart where possible.
* Sucks less than X (insert random guide/starter you found).

## TOC

* [Overview](#overview)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [JS Recommendations](#js-recommendations)
  * [JS Library Recommendations](#js-library-recommendations)
  * [Polyfills](#polyfills)
* [CSS Recommendations](#css-recommendations)
* [Database Recommendations](#database-recommendations)
* [Server Recommendations](#server-recommendations)
* [Deployment Recommendations](#deployment-recommendations)
* [TODO](#todo)
* [License](#license)

## Dependencies

These examples require some CLI tools. To run them, you'll be using a terminal. To install them, you'll need a _package manager_ and `make`. These tools are general-purpose and will serve you well in the future.

Terminal:

* Linux/BSD: use system default; you already know.
* MacOS: use system default or https://iterm2.com.
* Windows: use https://github.com/microsoft/terminal. Set the default profile to PowerShell.

Package manager:

* Linux/BSD: use system default; you already know.
* MacOS: use Homebrew: https://brew.sh.
* Windows: use Scoop: https://scoop.sh (less trouble), or Chocolatey: https://chocolatey.org (more trouble).
  * After installing things, you _may_ need to refresh environment variables by restarting the entire terminal app.

`make`: universal orchestrator of build tasks.

* Linux/BSD/MacOS: preinstalled.
* Windows: `scoop install make` or `choco install make`.

If you don't already have [`git`](https://git-scm.com) installed, get it. (Comes preinstalled on Linux/BSD/MacOS.)

<details>
<summary>Most examples require something extra. Click for details.</summary>

Run `make deps` in an example directory to install just what it needs.

`sass`: less bad way to write CSS.

  * Linux/BSD: see https://sass-lang.com/install.
  * MacOS: `brew install -q sass/sass/sass`.
  * Windows: `scoop install sass` or `choco install sass`.

`deno`: JS interpreter with filesystem and network access. Newer, nicer replacement for Node.js.

  * Linux/BSD: see https://deno.land.
  * MacOS: `brew install -q deno`.
  * Windows: `scoop install deno` or `choco install deno`.
</details>

## Usage

Make sure [Dependencies](#dependencies) are installed.

Clone this repository via `git`.

Every example is self-contained. Pick an example, `cd` to it, then for most examples:

    make deps
    make

Then start messing around and experimenting!

## JS Recommendations

Learn [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) and the native [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). Before you touch any view frameworks, try making apps with nothing but browser built-ins.

Learn the built-in API for [custom DOM elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). It obsolesces "reactive" view frameworks such as React, Vue, Angular, etc.

Use the new [native JS modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

For anything asynchronous, use [`async/await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await), with [abort signals](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) for cancelation. Learn the [Promise API](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) which is the foundation of `async/await`. When dealing with callback-based APIs, convert them to promises.

Avoid build tools such as Webpack, Gulp, Rollup, Parcel, Babel, TypeScript, and others. (Esbuild is useful for production builds, but not when learning.) Avoid huge "starter" packages such as `create-react-app`. Avoid huge frameworks such as Next.js. They will only waste your time. Use native modules. Run directly from source code. Use Make to orchestrate build tasks, as shown here.

For general JS scripting, learn and use [Deno](https://deno.land).

### JS Library Recommendations

Prefer tiny, focused, dependency-free tools.

For HTTP requests, use the native [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Use [abort signals](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) for cancelation.

Consider using https://github.com/mitranim/js as your main library suite. It's used by the examples in this repository.

### Polyfills

* [Custom elements polyfill](https://github.com/ungap/custom-elements). Required in some modern browsers for the "customized built-in elements" feature.

* [`es-module-shims`](https://github.com/guybedford/es-module-shims) allows to use import maps in all modern browsers.

## CSS Recommendations

* Use [Sass](https://sass-lang.com).
* Learn and use [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
* Use [`rem`](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#ems_and_rems) for all your sizes.
* Prefer big units such as `0.5rem`/`1rem`/`2rem`/`4rem`.
* Avoid `px`. There are very few OK uses of `px`:
  * For media queries such as `max-width`.
  * For something very small: `3px` or less.
* Avoid fixed sizes such as `24rem` or `300px`. Write flexible layouts.
  * Fixed `max-width` or `max-height` (specifically _max_) is OK.
* Leave default `font-size` as-is. Let the user agent decide. To increase or decrease font size, use proportions of `rem` such as `1.2rem`.
* Be suspicious of `position: absolute`, `position: relative`, `overflow: hidden`, `!important`. They tend to be abused. The list is not exhaustive.
* Avoid negative margins. There is usually a better way.
* Avoid specifying margins in a complicated CSS class. Margins should be set "externally" by the parent/context. Each class should control its own internal layout, including padding, but not how it aligns to its siblings. Having a class that sets _only_ margins is OK.
* When using Sass, write small, reusable classes and combine them via `@extend`.
* Avoid serif fonts. Avoid small font sizes.
* Consider using or reading [`sb`](https://github.com/mitranim/sb) for inspiration on foundations of your CSS.

## Database Recommendations

Avoid anything non-relational. Important data is always relational.

Learn SQL with Postgres. Use [Postgres docs](https://www.postgresql.org/docs/current/) to learn about SQL in general. When googling about SQL, prefix your search with "postgres" to minimize asinine results.

Avoid ORMs. Just write SQL. SQL databases usually come with a CLI tool that runs SQL scripts (Postgres: `psql`); use it.

Don't make SQL queries by bashing strings together. Use SQL parameters. Look for a minimal query builder that lets you use SQL, rather than its own custom dialect. Example for Go: [sqlb](https://github.com/mitranim/sqlb).

## Server Recommendations

For JS build tools, servers, and general scripting, learn [Deno](https://deno.land). Using it for a minimal server can be time-efficient for small projects. Avoid for complicated servers, or you'll drown in maintenance. (TypeScript might be acceptable, but performance may suck compared to Go.)

Learn and use [Go](https://golang.org). It's time-inefficient for new projects, but very solid in the long run. It also heals brain damage inflicted by other languages.

* Use panics as exceptions. Avoid manual error handling.
* Use generics.
* Consider using https://github.com/mitranim/gg as your main library suite.

For brain health, try learning [Rust](https://www.rust-lang.org). If unsuccessful, retry in a year.

PHP runs some of the world's most successful sites, but inflicts horrible brain damage. Success is not guaranteed. Probably avoid.

Django, Ruby on Rails, Wordpress can be extremely time-efficient for new projects, but extremely limiting for long-term projects that require something custom. Consider using with caution.

Avoid immature "all-in-one" frameworks trying to emulate Ruby on Rails. They will only waste your time.

## Deployment Recommendations

For stateless websites, like a personal blog, make a _static site_ and host it on GitHub Pages, Netlify, or something similar; often for free. A static site consists of pre-generated files, can be served efficiently over a CDN, and doesn't require maintenance. Many examples in this repo are for static sites.

If your app is simple enough, consider using "cloud functions/lambdas", supported by services such as Netlify. Less hassle than a full server.

Learn how to containerize (via [Docker](https://docs.docker.com/get-started/overview/) or similar). Automate your deployment, use config files and scripts, turn it into a single command. Every tear you shed now is worth 1024 tears that would be shed later.

Things to avoid:

  * Anything called a "hosting".
  * Manually setting up a remote system, by running individual commands.

## TODO

Known missing examples / features:

  * Example: SSR+SPA hybrid.
  * Example: API backend.
  * Example: Postgres and Go.

## License

All code in this repository is Unlicensed via https://unlicense.org.

## Misc

I'm receptive to suggestions. If you want to suggest improvements, open an issue or chat me up. Contacts: https://mitranim.com/#contacts
