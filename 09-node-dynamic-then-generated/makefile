MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
TAR := target
STATIC := static
SASS := sass --no-source-map main.scss:$(TAR)/main.css
NODEW := watchexec -r -d=0 -n -e=mjs -i $(STATIC) -- node

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
	node node_modules/afr/afr_node_cli.mjs --port 36582 --verbose true

srv-w:
	$(NODEW) main.mjs srv

html:
	node main.mjs html

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
	scoop install sass nodejs watchexec
else
	brew install sass/sass/sass node watchexec
endif
	npm i
