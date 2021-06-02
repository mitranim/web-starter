MAKEFLAGS := --silent --always-make
SASS := sass --no-source-map main.scss:main.css

watch:
	echo Open ./index.html in your browser.
	$(SASS) --watch

build:
	$(SASS)

deps:
ifeq ($(OS), Windows_NT)
	scoop install sass
else
	brew install sass/sass/sass
endif
