build:
	tacker template/index.html template/dist/index.html
	rm -rf dist/*
	qjs build.js

watch:
	find . | entr -s "make build"
