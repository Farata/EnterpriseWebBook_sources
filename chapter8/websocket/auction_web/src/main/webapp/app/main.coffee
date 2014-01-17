define [
  'order!login',
  'order!donation',
#  'order!campaigns-map',
  'order!svg-pie-chart',
  'modules/generic-module'
], ()->
  (->
    way_to_give = document.getElementById("way-to-give")
    what_we_do = document.getElementById("what-we-do")
    who_we_are = document.getElementById("who-we-are")
    where_we_work = document.getElementById("where-we-work")

    modulesConfig = [
      moduleId: "whoWeAre",
      button: who_we_are,
      containerId: "who-we-are-container",
      htmlContentUrl: "assets/html-includes/who-we-are.html"
    ,
      moduleId: "whatWeDo"
      button: what_we_do
      containerId: "what-we-do-container"
      htmlContentUrl: "assets/html-includes/what-we-do.html"
    ,
      moduleId: "whereWeWork",
      button: where_we_work,
      containerId: "where-we-work-container",
      htmlContentUrl: "assets/html-includes/where-we-work.html"
    ]

    auctionModule =
      moduleId: "wayToGive"
      button: way_to_give
      containerId: "way-to-give-container"
      htmlContentUrl: "assets/html-includes/way-to-give.html"

    lazyLoadingEventHandlerFactory = (moduleId, containerId, htmlContentPath)->
      (event)->
        return if module is "loading"
        if module?
          module.render(event.target.id, containerId, htmlContentPath)
        else
          module = "loading"
          require ["modules/generic-module"], (GenericModule)->
            module = new GenericModule(moduleId);
            module.render(event.target.id, containerId, htmlContentPath)

    initModule = (module)->
      handler = lazyLoadingEventHandlerFactory(module.moduleId, module.containerId,
        module.htmlContentUrl)
      module.button.addEventListener "click", handler, false

    initAuctionModule = (@aModuleConfig)->
      handler = (event)->
        return if module is "loading"
        if module?
          module.render()
          module.startAuction()
          return
        else
          module = "loading"
          require ["modules/way-to-give"], (WayToGive)->
            module = new WayToGive();
            module.render();
          return

      aModuleConfig.button.addEventListener "click", handler, false
      return

    initModule module for module in modulesConfig

    initAuctionModule auctionModule

    console.log "app is loaded"

    return)()