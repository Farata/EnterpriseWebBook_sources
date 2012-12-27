define(["newContentLoader"], function(NewSection) {
  var WhatWeDo;
  console.log("who-we-are module is loaded");
  WhatWeDo = function() {
    return {
      rendered: false,
      render: function() {
        var dataUrl, newContainerID, whatWeDoBotton;
        if (!this.rendered) {
          whatWeDoBotton = "who-we-are";
          newContainerID = "who-we-are-container";
          dataUrl = "assets/html-includes/who-we-are.html";
          NewSection.getNewContent(whatWeDoBotton, newContainerID, dataUrl);
          this.rendered = true;
          return console.log("who-we-are module is rendered");
        }
      }
    };
  };
  return WhatWeDo;
});
