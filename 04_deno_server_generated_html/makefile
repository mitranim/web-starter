MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
STATIC := static
SASS := sass --no-source-map main.scss:$(TAR)/main.css
DENO := deno run -A --no-check

watch: clean
	$(PAR) styles_w srv_w live

build: clean all

all:
	$(PAR) styles html cp

styles_w:
	$(SASS) --watch

styles:
	$(SASS)

live:
	$(DENO) live.mjs

srv_w:
	$(DENO) --watch srv.mjs --dev

html:
	$(DENO) html.mjs

cp:
ifeq ($(OS), Windows_NT)
	if not exist "$(TAR)" mkdir "$(TAR)"
	copy "$(STATIC)"\* "$(TAR)" >nul
else
	mkdir -p "$(TAR)"
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
