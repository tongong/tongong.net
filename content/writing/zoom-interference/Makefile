build: src/*
	node build.js
	tacker src/index.html index.html

watch:
	find . | entr -s "make build"
