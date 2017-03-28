const gulp = require('gulp');
const eslint = require('gulp-eslint'); // https://github.com/adametry/gulp-eslint
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('coverage', () => {
  return gulp.src(['lib/**/*.js','!lib/common.js'])
    // Covering files 
    .pipe(istanbul({
      includeUntested: true
    }))
    // Force `require` to return covered files 
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], () => {
  return gulp.src('test/index.js')
    .pipe(mocha({
      reporter: 'spec',
      bail: true
    }))
    // Creating the reports after tests ran 
    .pipe(istanbul.writeReports());
});

gulp.task('eslint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['lib/**/*.js','test/**/*.js*'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['mocha', 'eslint']);
