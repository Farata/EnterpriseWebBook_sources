define(["newContentLoader"], function(NewSection) {
  var WayToGive;
  console.log("what-we-do module is loaded");
  WayToGive = function() {
    return {
      rendered: false,
      render: function() {
        var dataUrl, newContainerID, whatWeDoBotton;
        if (!this.rendered) {
          whatWeDoBotton = "what-we-do";
          newContainerID = "what-we-do-container";
          dataUrl = "assets/html-includes/what-we-do.html";
          NewSection.getNewContent(whatWeDoBotton, newContainerID, dataUrl);
          this.rendered = true;
          return console.log("what-we-do module is rendered");
        }
      }
    };
  };
  return WayToGive;
});
