// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery"], function($) {
  $('body').append('jQuery ' + $.fn.jquery + ' loaded!');
});
