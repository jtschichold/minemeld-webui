# minemeld-webui
WebUI for minemeld

## BUILDING

### Requirements

Not strictly required but suggested:

- virtualenv (https://pypi.python.org/pypi/virtualenv)
- nodeenv (https://github.com/ekalinin/nodeenv)

### Procedure

Setup a virtual node env and activate it

```
nodeenv -v -n 8.11.3 --npm=6.3.0 --prebuilt -c venv
. ./venv/bin/activate
```

Clone the repo

```
git clone https://github.com/PaloAltoNetworks/minemeld-webui.git
cd minemeld-webui
```

Install the package dev deps

```
npm install
```

Build the WebUI in the dist subdirectory

```
npm run dist
```

## TESTING

Use the following command to serve and test your local version of the WebUI during development:

```
npm run dev -- --url https://<IP of MineMeld VM>
```
