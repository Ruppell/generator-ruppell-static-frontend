var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  /**
   * @see https://yeoman.io/authoring/user-interactions.html
   */
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "description",
        message: "Your project description",
        default: "A static frontend structure for plain HTML theme development."
      }
    ]);
  }

  configuring() {
    // build everything within a folder
    this.destinationRoot('./' + this.answers.name + '/');
  }

  writing() {

    // copy over all files
    this.fs.copyTpl(
      this.templatePath('./*'),
      this.destinationPath('./'),
      {
        name: this.answers.name,
        description: this.answers.description
      }
    );

    this.fs.copy(
      this.templatePath('./src/**/*'),
      this.destinationPath('./src/'),
    );

    // copy over specific dot files
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // create package.json
    const pkgJson = {
      name: this.answers.name,
      description: this.answers.description,
      version: "0.0.0",
      main : "index.js",
      scripts: {
        serve: "browser-sync . -w",
        watch: "webpack --watch",
        build: "webpack",
        build_production: "webpack -p --config ./webpack.production.config.js",
        generate_favicons: "node ./src/js/tasks/generate-favicons.js",
      },
      browserslist: [
        "last 2 version"
      ]
    };
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

  }

  /**
   * Install dependencies
   */
  install() {

    // webpack and loaders
    this.npmInstall(['webpack@^4.0.0'], { 'save-dev': true });
    this.npmInstall(['webpack-cli@^3.0.0'], { 'save-dev': true });
    this.npmInstall(['sass-loader@^8.0.0'], { 'save-dev': true });
    this.npmInstall(['postcss-loader@^3.0.0'], { 'save-dev': true });
    this.npmInstall(['@babel/core@^7.0.0'], { 'save-dev': true });
    this.npmInstall(['@babel/preset-env@^7.0.0'], { 'save-dev': true });
    this.npmInstall(['file-loader@^5.0.0'], { 'save-dev': true });
    this.npmInstall(['babel-loader@^8.0.0'], { 'save-dev': true });
    this.npmInstall(['node-sass@^4.0.0'], { 'save-dev': true });
    this.npmInstall(['imagemin-webpack-plugin@^2.0.0'], { 'save-dev': true });
    this.npmInstall(['autoprefixer@^9.0.0'], { 'save-dev': true });
    this.npmInstall(['cssnano@^4.0.0'], { 'save-dev': true });

    // favicon generator
    this.npmInstall(['favicons@^5.0.0'], { 'save-dev': true });

    // normalize
    this.npmInstall(['normalize.css@^8.0.1']);

    // jquery
    this.npmInstall(['jquery@^3.0.0']);
  }

  end() {

    // run generate favicons after everything is done
    this.spawnCommandSync('npm', ['run', 'generate_favicons']);

    // webpack build bundles
    this.spawnCommandSync('npm', ['run', 'build']);

  }

};
