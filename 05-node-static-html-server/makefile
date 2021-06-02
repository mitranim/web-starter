MAKEFLAGS := --silent --always-make
PAR := $(MAKE) -j 128
SASS := sass --no-source-map main.scss:main.css
NODEW := watchexec -r -d=0 -n -e=mjs -i browser.mjs -- node

watch:
	$(PAR) styles-w srv-w

build: styles

styles-w:
	$(SASS) --watch

styles:
	$(SASS)

srv-w:
	$(NODEW) srv.mjs

srv:
	node srv.mjs

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass nodejs watchexec
else
	brew install sass/sass/sass node watchexec
endif
	npm i
