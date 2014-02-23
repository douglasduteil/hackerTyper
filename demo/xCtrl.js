/**
 * xCrtl
 */

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.\nThe experience might fail...');
}


angular.module('x', ['ui.codemirror'])

  .run(function ($rootScope) {
    $rootScope.openedFileNAme = 'untitled';
  })

  .controller('xCtrl', function () {
    var controler = {};


    // Use to trigger click event
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('click');

    var finalText = '';
    var finalTextCachedLength = '';
    var typingIndex = 0;
    var autoTyping;


    function typeNextChar(editor) {
      editor.replaceRange(finalText[typingIndex++], CodeMirror.Pos(editor.lastLine()));
    }

    function wirteAllSpaces(editor) {
      while (finalText[typingIndex] === ' ') {
        typeNextChar(editor);
      }
    }

    function toggleAutotypingMode(editor) {
      if (autoTyping) {
        clearInterval(autoTyping);
        autoTyping = null;
      } else {
        autoTyping = setInterval(function () {
          typeNextChar(editor);
        }, 0);
      }
    }

    controler.codemirrorOpts = {
      lineWrapping: true,
      lineNumbers: true,
      theme: 'twilight',
      mode: 'javascript',
      onLoad: codemirrorLoaded,


      onKeyEvent: function (editor, event) {
        if (event.type === 'keydown') {

          if (typingIndex < finalText.length) {

            if (event.keyCode === 8) {
              typingIndex = Math.max(0, --typingIndex);
              return;
            }

            if (event.keyCode === 192) {
              toggleAutotypingMode(editor);
            }

            wirteAllSpaces(editor);
            event.stop();
          }

        }
      }
    };



    function codemirrorLoaded(cm) {
      console.log('cm loaded');
      var $inputFilesHelper;


      controler.fakeFileCreation = function () {
        var input = document.createElement('input');
        input.type = 'file';
        $inputFilesHelper = angular.element(input);
        $inputFilesHelper[0].dispatchEvent(mouseEvent);

        $inputFilesHelper.bind('change', function (event) {
          console.log('$inputFilesHelper change');
          var file = event.target.files[0]; // FileList object
          if (!(file.type.match(/text.*/) || file.type.match(/application.*/))) {
            return;
          }

          var reader = new FileReader();

          reader.onload = function (e) {
            // Clear the current one

            cm.setValue('');
            cm.clearHistory();

            finalText = reader.result;
            finalTextCachedLength = finalText.length;
            typingIndex = 0;
          };

          reader.readAsText(file);
        });

      };
    }

    return controler;
  });
