PROJECT=sites-of-shame
USER=ddr
SHELL=/bin/bash

SRC_REPO_STAMEN=git@github.com:denshoproject/sites-of-shame.git
SRC_REPO_DATA=git@github.com:denshoproject/densho-sites-of-shame-data.git

INSTALL_BASE=/opt
INSTALLDIR=$(INSTALL_BASE)/$(PROJECT)
INSTALLDATA=$(INSTALL_BASE)/$(PROJECT)

# Type make print-VARNAME to print value of any variable
print-%: ; @echo $*=$($*)


.PHONY: help

help:
	@echo "denshoproject/sites-of-shame"
	@echo ""
	@echo "install - Installs yarn, then uses it to install project dependencies"
	@echo "remove  - Removes project dependencies and uninstalls yarn"
	@echo "clean   - Completely removes all traces of project except this repository"
	@echo "build   - Compiles to build/ directory"
	@echo ""

install:
	apt-get --assume-yes install csvkit sqlite3 yarnpkg
	yarnpkg install
	chown -R ansible.ansible $(INSTALLDIR)/node_modules/

far:
	-mkdir -p $(INSTALLDIR)/data-processing/input/
	-mkdir -p $(INSTALLDIR)/data-processing/output/
	cd data-processing/; make far

build-stage:
	yarnpkg staging
	rm -Rf .pnp
	rm -Rf .pnp.js
	rm -Rf npm-debug.log*
	rm -Rf yarn-debug.log*
	rm -Rf yarn-error.log*

build:
	yarnpkg build:production

push-stage:
	rsync -avz build/* ansible@ddrstatic.local:/var/www/sites-of-shame-stage/

push-production:
	rsync -avz build/* ansible@ddrstatic.local:/var/www/sites-of-shame/

uninstall:
	apt-get --assume-yes remove yarnpkg
	rm -Rf build/
	rm -Rf node_modules/
	rm -Rf coverage/
	rm -Rf .DS_Store/
	rm -Rf .env.local/
	rm -Rf .env.development.local/
	rm -Rf .env.test.local/
	rm -Rf .env.production.local/

clean: uninstall
	apt-get --assume-yes purge yarnpkg
