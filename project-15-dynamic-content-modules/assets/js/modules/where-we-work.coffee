define ["newContentLoader"], (NewSection) ->
  console.log "where-we-work module is loaded"
  WhereWeWork = ->
    render: ->
      module_button="where-we-work"
      newContainerID = "where-we-work-container"
      dataUrl = "assets/html-includes/where-we-work.html"
      NewSection.getNewContent module_button, newContainerID, dataUrl
      console.log "where-we-work module is rendered"

  WhereWeWork
