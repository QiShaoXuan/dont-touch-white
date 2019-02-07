const gulp = require('gulp'),
  browserSync = require("browser-sync").create(), //浏览器实时刷新
  sass = require('gulp-sass'),
  del = require('del'),
  replace = require('gulp-replace'),
  babel = require('gulp-babel'),
  cssMin = require('gulp-css'),
  uglify = require('gulp-uglify'),
  fileinclude = require('gulp-file-include')

gulp.task('delete', function (cb) {
  return del(['dist/*', '!dist/images', '!dist/fonts'], cb);
})

gulp.task('copy', function () {
  gulp.src(['src/styles*/asset*/*.css', 'src/scripts*/asset*/*.js', 'src/images*/**'])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('fileinclude', function () {
  gulp.src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('sass', () => {
  gulp.src('src/**/*.scss')
    .pipe(replace(/([-+]?[0-9]*\.?[0-9]+)px/g, function (match, p1) {
      if (p1 > 4) {
        return Number(p1) / 100 + 'rem';
      } else {
        return Number(p1) + 'px';
      }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssMin())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('babel', () => {
  return gulp.src(['./src/**/*.js', '!./src/asset/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('serve', ['delete'], function () {
  gulp.start('fileinclude', 'copy', 'sass', 'babel');
  browserSync.init({
    port: new Date().getFullYear(),
    server: {
      baseDir: ['./']
    }
  });
  gulp.watch(['src/*.html','src/components/*.html'], ['fileinclude'])
  gulp.watch(['src/styles*/asset*/*.css', 'src/scripts*/asset*/*.js', 'src/images*/**'], ['copy'])
  gulp.watch('src/**/*.scss', ['sass'])
  gulp.watch(['./src/**/*.js', '!./src/asset/*.js'], ['babel'])
});

gulp.task('default', ['serve']);
gulp.task('build', ['babel', 'sass', 'fileinclude', 'copy']);
