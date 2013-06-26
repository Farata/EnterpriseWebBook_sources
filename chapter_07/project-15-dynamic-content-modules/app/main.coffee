define [
  'order!login',
  'order!donation',
  'order!campaigns-map',
  'order!svg-pie-chart'
], ()->
  console.log "app is loaded"

  (->
    way_to_give = document.getElementById("way-to-give")
    what_we_do = document.getElementById("what-we-do")
    who_we_are = document.getElementById("who-we-are")
    where_we_work = document.getElementById("where-we-work")
    wayToGiveModule = null
    whatWeDoModule = null
    whoWeAreModule = null
    whereWeWorkModule = null

    lazyLoadingEventHandlerFactory = (module, modulePath)->
      clickEventHandler = (event)->
        return if module is "loading"
        if module isnt null
          module.render()
        else
          module = "loading"
          require [modulePath], (ModuleObject)->
            module = new ModuleObject()
            module.render()

      clickEventHandler

    wayToGiveHandleClick = lazyLoadingEventHandlerFactory(wayToGiveModule, "modules/way-to-give")
    whatWeDoHandleClick = lazyLoadingEventHandlerFactory(whatWeDoModule, "modules/what-we-do")
    whoWeAreHandleClick = lazyLoadingEventHandlerFactory(whoWeAreModule, "modules/who-we-are")
    whereWeWorkHandleClick = lazyLoadingEventHandlerFactory(whereWeWorkModule, "modules/where-we-work")

    way_to_give.addEventListener "click", wayToGiveHandleClick, false
    what_we_do.addEventListener "click", whatWeDoHandleClick, false
    who_we_are.addEventListener "click", whoWeAreHandleClick, false
    where_we_work.addEventListener "click", whereWeWorkHandleClick, false

    return)()