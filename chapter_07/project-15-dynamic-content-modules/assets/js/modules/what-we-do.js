define(["newContentLoader"], function (NewSection) {
    var WayToGive;
    console.log("what-we-do module is loaded");
    WayToGive = function () {
        return {
            render: function () {
                var dataUrl, module_button, newContainerID;
                module_button = "what-we-do";
                newContainerID = "what-we-do-container";
                dataUrl = "assets/html-includes/what-we-do.html";
                NewSection.getNewContent(module_button, newContainerID, dataUrl);
                return console.log("what-we-do module is rendered");
            }
        };
    };
    return WayToGive;
});
