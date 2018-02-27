#!/usr/bin/env bash

set -e

parcel build --public-url ./ src/index.html
cd dist
scp * pcoles:/home/pcoles/webapps/media/test2/langtons-ant/
cd -
