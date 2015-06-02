var record = document.getElementById('start');
var stop = document.getElementById('stop');
var video = document.getElementById('player');
video.setAttribute('controls', '');

var chunks = [];

var constraints = {video: true};

var onSuccess = function(stream) {
  console.log("stream", stream);
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
    console.log("data available");
    chunks.push(e.data);
  }

  mediaRecorder.onstop = function(e) {
    console.log('onstop fired');
    var blob = new Blob(chunks, { 'type' : 'video/ogv; codecs=opus' });
    video.src = window.URL.createObjectURL(blob);
  };

  mediaRecorder.onwarning = function(e) {
    console.log('onwarning fired');
  };

  mediaRecorder.onerror = function(e) {
    console.log('onerror fired');
  };
};

var onError = function(err) {
  console.log('The following error occured: ' + err);
}

navigator.mozGetUserMedia(constraints, onSuccess, onError);
