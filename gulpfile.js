var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('start', function () {
  nodemon({
    script: 'extra/server.js',
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('default', ['start']);
