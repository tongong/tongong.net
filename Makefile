build:
	tacker template/index.html template/dist/index.html
	mv dist/git /tmp/tongong.net-git
	rm -rf dist/*
	mv /tmp/tongong.net-git dist/git
	qjs build.js
	cp static/* dist/

build-git:
	make build
	cd git && node build.js

watch:
	find . | entr -s "make build"
