console.log('lollll.');

//var navigator.getUserMedia = navigator.mozGetUserMedia;

var record = document.getElementById('start');
var stop = document.getElementById('stop');
var audio = document.getElementById('player');
audio.setAttribute('controls', '');

//if (navigator.getUserMedia) {
if (true) {
  //console.log('getUserMedia supported.');

  var constraints = { audio: true };

  var onSuccess = function(stream) {
    var mediaRecorder = new MediaRecorder(stream);

    record.onclick = function() {
      mediaRecorder.start();
      console.log("recorder started");
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log("recorder stopped");
    }

    mediaRecorder.ondataavailable = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      //var audio = document.createElement('audio');
      var audioURL = window.URL.createObjectURL(e.data);
      audio.src = audioURL;
    }
  };

  var onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mozGetUserMedia(constraints, onSuccess, onError);
} else {
   console.log('getUserMedia not supported on your browser!');
}
