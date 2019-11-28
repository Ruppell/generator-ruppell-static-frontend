var fs = require('fs');
var favicons = require('favicons'),
    source = './images/favicon.png',              // Source image(s). `string`, `buffer` or array of `string`
    configuration = {
      path: "./images/favicons/",               // Path for overriding default icons path. `string`
      appName: null,                            // Your application's name. `string`
      appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: null,                     // Your application's description. `string`
      developerName: null,                      // Your (or your developer's) name. `string`
      developerURL: null,                       // Your (or your developer's) URL. `string`
      dir: "auto",                              // Primary text direction for name, short_name, and description
      lang: "en-US",                            // Primary language for name and short_name
      background: "#fff",                       // Background colour for flattened icons. `string`
      theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      scope: "/",                               // set of URLs that the browser considers within your app
      start_url: "/",                           // Start URL when launching the application from a device. `string`
      version: "1.0",                           // Your application's version string. `string`
      logging: false,                           // Print logs to console? `boolean`
      pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
        //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
        //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
        //
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: false,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: false               // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      }
    },

    callback = function (error, response) {
      if (error) {
        console.log(error.message); // Error description e.g. "An unknown error has occurred"
        return;
      }

      // create directory if not exists
      if (!fs.existsSync('./images/favicons/')){
        fs.mkdirSync('./images/favicons/');
      }

      // save generated favicons
      response.images.forEach(function(_imageFile) {
        fs.writeFile('./images/favicons/' + _imageFile.name, _imageFile.contents, function(err) {
          if(err) {
            return console.log(err);
          }
        });
      });

      // save generated files
      response.files.forEach(function(_file) {
        fs.writeFile('./images/favicons/' + _file.name, _file.contents, function(err) {
          if(err) {
            return console.log(err);
          }
        });
      });

      // save all meta tags to an html file
      if (fs.existsSync('./images/favicons/meta.html')) {
        fs.unlinkSync('./images/favicons/meta.html'); // remove it fist
      }

      var file = fs.createWriteStream('./images/favicons/meta.html');
      file.on('error', function(err) { /* error handling */ });
      response.html.forEach(function(line) { file.write(line + '\n'); });
      file.end();

    };

favicons(source, configuration, callback);
