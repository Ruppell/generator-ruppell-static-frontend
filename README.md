# Ruppell | Static Frontend Generator

Generates a static frontend structure for plain HTML theme development.

## How to use

```
yo ruppell-static-frontend
```

## Folder Structure:

```
- postcss.config.js
- webpack.production.config.js
- webpack.config.js
- index.html
- index.js
- src
  - images
  - js
  - sass
- .gitignore
- .editorconfig
- README.md
```

## Generator includes:

- @babel/core
- @babel/preset-env
- webpack-cli
- webpack
  - sass-loader
  - postcss-loader
  - file-loader
  - babel-loader
  - imagemin-webpack-plugin
- node-sass
- autoprefixer
- cssnano
- favicons
- jquery
- normalize.css
