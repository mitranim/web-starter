MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
SASS := sass --no-source-map main.scss:$(TAR)/main.css
NODEW := watchexec -r -d=0 -n -e=mjs -i browser.mjs -- node

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
	node node_modules/afr/afr_node_cli.mjs --port 36582 --verbose true

html-srv-w:
	$(NODEW) main.mjs html srv

html:
	node main.mjs html

cp:
ifeq ($(OS), Windows_NT)
	if not exist $(TAR) mkdir $(TAR)
	copy browser.mjs $(TAR) >nul
else
	mkdir -p $(TAR)
	cp browser.mjs $(TAR)
endif

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
