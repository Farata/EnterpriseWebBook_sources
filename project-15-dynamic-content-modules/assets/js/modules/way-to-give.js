define(["newContentLoader"], function (NewSection) {
    var WayToGive;
    console.log("way-to-give module is loaded");
    WayToGive = function () {
        return {
            rendered: false,
            render: function () {
                var dataUrl, newContainerID, whatWeDoButton;
                whatWeDoButton = "way-to-give";
                newContainerID = "way-to-give-container";
                dataUrl = "assets/html-includes/way-to-give.html";
                NewSection.getNewContent(whatWeDoButton, newContainerID, dataUrl);
                return console.log("way-to-give module is rendered");
            },
            init: function () {
                return console.log("way-to-give init");
            }
        };
    };
    return WayToGive;
});
