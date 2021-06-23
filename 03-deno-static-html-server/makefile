MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
SASS := sass --no-source-map main.scss:main.css
DENO := deno run -A --unstable --no-check

watch:
	$(PAR) styles-w srv-w

build: styles

styles-w:
	$(SASS) --watch

styles:
	$(SASS)

srv-w:
	$(DENO) --watch srv.mjs

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass deno
else
	brew install -q sass/sass/sass deno
endif
