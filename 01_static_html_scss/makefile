MAKEFLAGS := --silent --always-make
SASS := sass --no-source-map main.scss:main.css

watch:
	echo open ./index.html in your browser
	$(SASS) --watch

build:
	$(SASS)

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass
else
	brew install -q sass/sass/sass
endif
