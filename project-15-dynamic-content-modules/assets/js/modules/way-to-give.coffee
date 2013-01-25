define ["newContentLoader"], (NewSection) ->
  console.log "way-to-give module is loaded"
  WayToGive = ->
    rendered: false
    render: ->
      whatWeDoButton = "way-to-give"
      newContainerID = "way-to-give-container"
      dataUrl = "assets/html-includes/way-to-give.html"
      NewSection.getNewContent whatWeDoButton, newContainerID, dataUrl
      console.log "way-to-give module is rendered"
    init: ->
      console.log "way-to-give init"

  WayToGive
