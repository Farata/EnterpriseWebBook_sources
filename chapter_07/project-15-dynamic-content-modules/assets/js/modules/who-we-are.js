define(["newContentLoader"], function (NewSection) {
    var WhatWeDo;
    console.log("who-we-are module is loaded");
    WhatWeDo = function () {
        return {
            rendered: false,
            render: function () {
                var dataUrl, newContainerID, whatWeDoButton;
                whatWeDoButton = "who-we-are";
                newContainerID = "who-we-are-container";
                dataUrl = "assets/html-includes/who-we-are.html";
                NewSection.getNewContent(whatWeDoButton, newContainerID, dataUrl);
                return console.log("who-we-are module is rendered");
            }
        };
    };
    return WhatWeDo;
});
