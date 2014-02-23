/**
 * xCrtl
 */
angular.module('x', ['ui.codemirror'])
  .controller('xCtrl', function () {
    var controler = {};

    controler.codemirrorOpts = {

      lineWrapping: true,
      lineNumbers: true,
      theme: 'twilight',
      mode: 'javascript',
      onLoad: codemirrorLoaded
    };


    function codemirrorLoaded(cm) {
      setTimeout(function(){
        cm.refresh();
      }, 100);
      console.log('cm loaded');
    }

    return controler;
  });
