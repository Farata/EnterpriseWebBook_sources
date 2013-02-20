chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create("photo.html", {
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        left: 100,
        top: 100,
        type: 'shell'
    });
});