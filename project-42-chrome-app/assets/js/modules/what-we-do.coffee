define ["newContentLoader"], (NewSection) ->
  console.log "what-we-do module is loaded"
  WayToGive = ->
    render: ->
      module_button = "what-we-do"
      newContainerID = "what-we-do-container"
      dataUrl = "assets/html-includes/what-we-do.html"
      NewSection.getNewContent module_button, newContainerID, dataUrl
      console.log "what-we-do module is rendered"

  WayToGive
