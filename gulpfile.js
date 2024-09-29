const { src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  pug: {
    src: ['components/**/*.pug', 'index.pug'],
    dest: 'dist/'
  },
  scss: {
    src: 'css/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'assets/img/**/*.{png,jpg,jpeg,gif,svg}',
    dest: 'dist/assets/img'
  }
};

function compilePug() {
  return src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

function compileScss() {
  return src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
}

function imagesTask() {
  return src(paths.images.src, { encoding: false })
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch(paths.pug.src, series(compilePug, browserSyncReload));
  watch(paths.scss.src, series(compileScss, browserSyncReload));
  watch(paths.js.src, series(jsTask, browserSyncReload));
  watch(paths.images.src, series(imagesTask, browserSyncReload));
}

exports.default = series(
  parallel(compilePug, compileScss, jsTask, imagesTask),
  browserSyncServe,
  watchTask
);
