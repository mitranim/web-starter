MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
STATIC := static
SASS := sass --no-source-map main.scss:$(TAR)/main.css
DENO := deno run -A --import-map imports.json

watch: clean
	$(PAR) styles-w afr-w srv-w

build: clean all

all:
	$(PAR) styles html cp

styles-w:
	$(SASS) --watch

styles:
	$(SASS)

afr-w:
	deno run --allow-net --allow-read https://unpkg.com/afr@0.3.2/afr_deno.mjs --port 36582 --verbose true

srv-w:
	$(DENO) --watch main.mjs srv

html:
	$(DENO) main.mjs html

cp:
ifeq ($(OS), Windows_NT)
	if not exist $(TAR) mkdir $(TAR)
	copy $(STATIC)\* $(TAR) >nul
else
	mkdir -p $(TAR)
	cp $(STATIC)/* $(TAR)
endif

clean:
ifeq ($(OS), Windows_NT)
	if exist $(TAR) rmdir /s /q $(TAR)
else
	rm -rf $(TAR)
endif

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass deno
else
	brew install sass/sass/sass deno
endif
