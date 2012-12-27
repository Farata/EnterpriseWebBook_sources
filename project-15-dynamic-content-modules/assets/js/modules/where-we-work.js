define(["newContentLoader"], function(NewSection) {
  var WhereWeWork;
  console.log("where-we-work module is loaded");
  WhereWeWork = function() {
    return {
      rendered: false,
      render: function() {
        var dataUrl, newContainerID, whatWeDoBotton;
        if (!this.rendered) {
          whatWeDoBotton = "where-we-work";
          newContainerID = "where-we-work-container";
          dataUrl = "assets/html-includes/where-we-work.html";
          NewSection.getNewContent(whatWeDoBotton, newContainerID, dataUrl);
          this.rendered = true;
          return console.log("where-we-work module is rendered");
        }
      }
    };
  };
  return WhereWeWork;
});
