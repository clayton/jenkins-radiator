# [gulp](https://github.com/wearefractal/gulp)-eco

> Gulp plugin to compile eco.js template engine

## Install

Install with [npm](https://www.npmjs.org)

```
npm install --save-dev gulp-eco
```


## Example

js
```js
var gulp = require('gulp');
var eco = require('gulp-eco');

gulp.task('eco', function () {
  return gulp.src(paths.templates)
    .pipe(eco({basePath: 'frontend/javascripts'}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['eco']);
```


## API

### eco(options)

#### options.namespace

Type: `String`
Default: `JST`

define your own namespace to access the templates:

```js
eco({namespace: 'ECO'})
```

access templates via:

```js
window.ECO["template_name"]({name: 'Manfred'})
```

#### options.basePath

Type: `String`
Default: ``

eco compiles evry template file into a function, which you can call with:

```js
windowJST["template_name"]({name: 'Manfred'})
```

The ```template_name``` depends is the absolute path to the file. E.g.

```js
/var/www/app/templates/users/users.jst.eco
```

By passing basePath: 'app/templates' you can strip the ```template_name``` to

```js
users/users.jst
```

## License

MIT © Kalle Saas <kalle@easypep.de>
