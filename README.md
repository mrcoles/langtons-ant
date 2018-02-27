
Langton's Ant
=============

Implementation of [Langton's ant](https://en.wikipedia.org/wiki/Langton%27s_ant)
in JavaScript and HTML5 canvas.

Written during a pairing exercise at [the Recurse Center](https://www.recurse.com/)
with [@benjeee](https://github.com/benjeee). Thanks for a first round of pairing
in Python with [@erinkshaw](https://github.com/erinkshaw)
and extra chats with [@ldirer](https://github.com/ldirer)!

### Setup

Add [parceljs](https://parceljs.org/getting_started.html) (`yarn global add parcel-bundler`) if necessary.

Setup the project and start a dev server on localhost:

```
yarn install
parcel src/index.html
```

Build the project, so it can be served statically:

```
parcel build --public-url ./ src/index.html
```
