MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
SASS := sass --no-source-map main.scss:main.css
DENO := deno run -A --unstable --no-check

watch:
	$(PAR) styles_w srv_w

build: styles

styles_w:
	$(SASS) --watch

styles:
	$(SASS)

srv_w:
	$(DENO) --watch srv.mjs

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass deno
else
	brew install -q sass/sass/sass deno
endif
