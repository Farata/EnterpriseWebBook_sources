define [
  'order!login',
  'order!donation',
#  'order!campaigns-map',
  'order!svg-pie-chart',
  "modules/generic-module"
], ()->
  console.log "app is loaded"

  (->
    way_to_give = document.getElementById("way-to-give")
    what_we_do = document.getElementById("what-we-do")
    who_we_are = document.getElementById("who-we-are")
    where_we_work = document.getElementById("where-we-work")

    modulesConfig = [
      moduleId: "wayToGive"
      button: way_to_give
      containerId: "way-to-give-container"
      htmlContentUrl: "assets/html-includes/way-to-give.html"
    ,
      moduleId: "whatWeDo"
      button: what_we_do
      containerId: "what-we-do-container"
      htmlContentUrl: "assets/html-includes/what-we-do.html"
    ,
      moduleId: "whoWeAre",
      button: who_we_are,
      container: "who-we-are-container",
      htmlContentUrl: "assets/html-includes/who-we-are.html"
    ,
      moduleId: "whereWeWork",
      button: where_we_work,
      container: "where-we-work-container",
      htmlContentUrl: "assets/html-includes/who-we-are.html"
    ]

    lazyLoadingEventHandlerFactory = (moduleId, button, containerId, htmlContentPath)->
      clickEventHandler = (event)->
        return if module is "loading"
        if module?
          module.render()
        else
          module = "loading"
          require ["modules/generic-module"], (genericModule)->
            module = new genericModule(moduleId);
            module.render(button, containerId, htmlContentPath)

    initModule = (module)->
      handler = lazyLoadingEventHandlerFactory(module.moduleId, module.button, module.container,
        module.htmlContentUrl)
      module.button.addEventListener "click", handler, false

    initModule module for module in modulesConfig

    return)()