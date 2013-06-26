define [
  'order!login',
  'order!donation',
#  'order!campaigns-map',
  'order!svg-pie-chart'
], ()->
  console.log "app is loaded"

  (->
    way_to_give = document.getElementById("way-to-give")
    what_we_do = document.getElementById("what-we-do")
    who_we_are = document.getElementById("who-we-are")
    where_we_work = document.getElementById("where-we-work")

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

    wayToGiveHandleClick = lazyLoadingEventHandlerFactory("wayToGive", way_to_give, "way-to-give-container",
      "assets/html-includes/way-to-give.html")

    whatWeDoHandleClick = lazyLoadingEventHandlerFactory("whatWeDo", what_we_do, "what-we-do-container",
      "assets/html-includes/what-we-do.html")
    whoWeAreHandleClick = lazyLoadingEventHandlerFactory("whatWeAre", who_we_are, "who-we-are-container",
          "assets/html-includes/who-we-are.html")
    whereWeWorkHandleClick = lazyLoadingEventHandlerFactory("whereWeWork", where_we_work, "where-we-work-container",
              "assets/html-includes/where-we-work.html")

    way_to_give.addEventListener "click", wayToGiveHandleClick, false
    what_we_do.addEventListener "click", whatWeDoHandleClick, false
    who_we_are.addEventListener "click", whoWeAreHandleClick, false
    where_we_work.addEventListener "click", whereWeWorkHandleClick, false

    return)()