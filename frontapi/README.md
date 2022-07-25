# Project description
Stock item service front end interface.

# Type:
Module.

# Npm dependecies:
* express;

# Configuration and Variable environment:
* PORT_SRV = Port that the service will listen to (Default value 0 and required).

# System Administration:
* Start service:
```
$ npm start
```
or
```
$ node server/index.js
```
# Project structure:
```
├── Containerfile
├── package.json
├── package-lock.json
├── README.md
├── server
│   └── index.js
├── src
│   ├── components
│   │   ├── body
│   │   │   ├── create-stockitem
│   │   │   │   └── index.js
│   │   │   ├── delete-stockitem
│   │   │   │   └── index.js
│   │   │   ├── index.js
│   │   │   ├── nav
│   │   │   │   └── index.js
│   │   │   ├── search-stockitem
│   │   │   │   └── index.js
│   │   │   └── update-stockitem
│   │   │       └── index.js
│   │   ├── footer
│   │   │   └── index.js
│   │   └── header
│   │       └── index.js
│   ├── index.html
│   └── public
│       └── css
│           └── style.css
└── test.js
```

# Podman/Docker build:
* [Build image - HERE](./Containerfile)