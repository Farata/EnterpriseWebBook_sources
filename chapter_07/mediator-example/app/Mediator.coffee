define ->
  class Mediator
    Mediator = ->
      throw new Error("Cannot instantiate more than one Mediator, use MySingleton.getInstance()")  if instance isnt null
      @initialize()
    instance = null
    Mediator:: =
      initialize: ->
        Mediator.getInstance = ->
          instance = new Mediator()  if instance is null
          instance

        components = {}
        @registerComponent: (name, component)=>
          for cmp of components
            if components[cmp] == component
              break
          component.setMediator this
          components[name] = component
          return

        @unregisterComponent: (name) =>
          for cmp of components
            if components[cmp] == name
              delete components[cmp]
          return

        @broadcast: (event, args, source) =>
          if not event
            return
          args = args || []
          for cmp of components
            if typeof components[cmp]["on" + event] == 'function'
              console.log("%c Mediator: event #{event} on #{cmp} ", "color: #bada55");
              source = source || components[cmp]
              components[cmp]["on" + event].apply(source, args)
          return

        Mediator.getInstance()