define [
  'login',
  'donation',
  'campaigns-map',
  'svg-pie-chart',
  'modules/generic-module'
], ()->
  onDemandLoadingClickHandlerFactory = (config)->
    (event)->
      return if config.amdInstance is "loading"
      if config.amdInstance?
        config.amdInstance.render(event.target.id, config.containerId, config.viewUrl)
        return
      else
        config.amdInstance = "loading"
        require ["modules/generic-module"], (GenericModule)->
          moduleInstance = new GenericModule(config.moduleId);
          moduleInstance.render(event.target.id, config.containerId, config.viewUrl)
          config.amdInstance = moduleInstance
          return
        return

  initComponent = (config)->
    config.button.addEventListener "click", onDemandLoadingClickHandlerFactory(config), false
    return

  (->
    way_to_give = document.getElementById("way-to-give")
    what_we_do = document.getElementById("what-we-do")
    who_we_are = document.getElementById("who-we-are")
    where_we_work = document.getElementById("where-we-work")

    componentConfigArray = [
      moduleId: "whoWeAre",
      button: who_we_are,
      containerId: "who-we-are-container",
      viewUrl: "assets/html-includes/who-we-are.html"
    ,
      moduleId: "whatWeDo"
      button: what_we_do
      containerId: "what-we-do-container"
      viewUrl: "assets/html-includes/what-we-do.html"
    ,
      moduleId: "whereWeWork",
      button: where_we_work,
      containerId: "where-we-work-container",
      viewUrl: "assets/html-includes/where-we-work.html"
    ,
      moduleId: "wayToGive"
      button: way_to_give
      containerId: "way-to-give-container"
      viewUrl: "assets/html-includes/way-to-give.html"
    ]

    initComponent componentConfig for componentConfig in componentConfigArray

    console.log "app is loaded"

    return)()