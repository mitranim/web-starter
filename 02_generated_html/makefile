MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
SASS := sass --no-source-map main.scss:$(TAR)/main.css
DENO := deno run -A --no-check

watch:
	$(PAR) styles_w html_w

build: clean all

all:
	$(PAR) styles html

styles_w:
	$(SASS) --watch

styles:
	$(SASS)

html_w:
	echo open ./$(TAR)/index.html in your browser
	$(DENO) --watch html.mjs

html:
	$(DENO) html.mjs

clean:
ifeq ($(OS), Windows_NT)
	if exist "$(TAR)" rmdir /s /q "$(TAR)"
else
	rm -rf "$(TAR)"
endif

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass deno
else
	brew install -q sass/sass/sass deno
endif
