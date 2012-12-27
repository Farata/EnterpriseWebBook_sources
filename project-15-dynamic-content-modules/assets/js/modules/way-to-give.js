define(["newContentLoader"], function(NewSection) {
  var WayToGive;
  console.log("way-to-give module is loaded");
  WayToGive = function() {
    return {
      rendered: false,
      render: function() {
        var dataUrl, newContainerID, whatWeDoBotton;
        if (!this.rendered) {
          whatWeDoBotton = "way-to-give";
          newContainerID = "way-to-give-container";
          dataUrl = "assets/html-includes/way-to-give.html";
          NewSection.getNewContent(whatWeDoBotton, newContainerID, dataUrl);
          this.rendered = true;
          return console.log("way-to-give module is rendered");
        }
      }
    };
  };
  return WayToGive;
});
