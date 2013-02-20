define(["newContentLoader"], function (NewSection) {
    var WhereWeWork;
    console.log("where-we-work module is loaded");
    WhereWeWork = function () {
        return {
            render: function () {
                var dataUrl, module_button, newContainerID;
                module_button = "where-we-work";
                newContainerID = "where-we-work-container";
                dataUrl = "assets/html-includes/where-we-work.html";
                NewSection.getNewContent(module_button, newContainerID, dataUrl);
                return console.log("where-we-work module is rendered");
            }
        };
    };
    return WhereWeWork;
});
