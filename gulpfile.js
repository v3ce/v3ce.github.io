const gulp = require('gulp');
const workbox = require('workbox-build');

// -----------------
// PWA (with Workbox)
// -----------------
gulp.task('generate-service-worker', () => {
  return workbox.injectManifest({
    swSrc: './sw-template.js',
    swDest: './public/sw.js',
    globDirectory: './public',
    globPatterns: ['**/*.{html,css,js,json,woff2}'],
    modifyURLPrefix: {
      '': './',
    },
  });
});

gulp.task('build', gulp.series('generate-service-worker'));

// -----------------
// Default Tasks
// -----------------
gulp.task('default', gulp.series('generate-service-worker'));
