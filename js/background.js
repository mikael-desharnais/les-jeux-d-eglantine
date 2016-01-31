chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
  	state: "fullscreen",
    'bounds': {
      'width': 1280,
      'height': 800
    }
  });
});
