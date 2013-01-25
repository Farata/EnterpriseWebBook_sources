define ["newContentLoader"], (NewSection) ->
  console.log "who-we-are module is loaded"
  WhatWeDo = ->
    rendered: false
    render: ->
      whatWeDoButton = "who-we-are"
      newContainerID = "who-we-are-container"
      dataUrl = "assets/html-includes/who-we-are.html"
      NewSection.getNewContent whatWeDoButton, newContainerID, dataUrl
      console.log "who-we-are module is rendered"

  WhatWeDo
