MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
SASS := sass --no-source-map main.scss:$(TAR)/main.css
NODEW := watchexec -r -d=0 -n -e=mjs -- node

watch:
	$(PAR) styles-w html-w

build: clean all

all:
	$(PAR) styles html

styles-w:
	$(SASS) --watch

styles:
	$(SASS)

html-w:
	echo Open ./$(TAR)/index.html in your browser.
	$(NODEW) html.mjs

html:
	node html.mjs

clean:
ifeq ($(OS), Windows_NT)
	if exist $(TAR) rmdir /s /q $(TAR)
else
	rm -rf $(TAR)
endif

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass nodejs watchexec
else
	brew install sass/sass/sass node watchexec
endif
	npm i
