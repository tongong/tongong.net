build:
	tacker template/index.html template/dist/index.html
	rm -rf dist/*
	qjs build.js
	cp static/* dist/

watch:
	find . | entr -s "make build"
