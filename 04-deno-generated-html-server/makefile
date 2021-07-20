MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
STATIC := static
SASS := sass --no-source-map main.scss:$(TAR)/main.css
DENO := deno run -A --unstable --no-check --import-map imports.json

watch: clean
	$(PAR) styles-w afr-w html-srv-w

build: clean all

all:
	$(PAR) styles html cp

styles-w:
	$(SASS) --watch

styles:
	$(SASS)

afr-w:
	deno run --allow-net --allow-read --unstable https://deno.land/x/afr@0.5.0/afr.ts --port 36582 --verbose true

html-srv-w:
	$(DENO) --watch main.mjs html srv

html:
	$(DENO) main.mjs html

cp:
ifeq ($(OS), Windows_NT)
	if not exist "$(TAR)" mkdir "$(TAR)"
	copy "$(STATIC)"\* "$(TAR)" >nul
else
	mkdir -p $(TAR)
	cp "$(STATIC)"/* "$(TAR)"
endif

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
