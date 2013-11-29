define ["newContentLoader"], (contentLoader) ->
  console.log "way-to-give module is loaded"
  wayToGive = ->
    rendered: false
    render: ->
      whatWeDoButton = "way-to-give"
      newContainerID = "way-to-give-container"
      dataUrl = "assets/html-includes/way-to-give.html"
      contentLoader.getNewContent whatWeDoButton, newContainerID, dataUrl
      console.log "way-to-give module is rendered"
    init: ->
      console.log "way-to-give init"

  wayToGive