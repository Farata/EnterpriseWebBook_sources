define ["newContentLoader"], (contentLoader) ->
  genericModule = (moduleId)->
    render: (button, containerId, dataUrl)->
      contentLoader.getNewContent(button, containerId, dataUrl)
      console.log("Module #{moduleId} is rendered...")

  genericModule
