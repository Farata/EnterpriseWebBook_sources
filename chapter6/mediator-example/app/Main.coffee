define [
  'mediator',
  'pricePanel'
  'orderPanel'
],
(Mediator, PricePanel, OrderPanel)->
  (->
    document.getElementById("priceInput").addEventListener("change", ()->
      if !!this.value
        Mediator.broadcast("BidClick", [this.value])
    )
    Mediator.registerComponent("pricePanel", new PricePanel())
    Mediator.registerComponent("orderPanel", new OrderPanel())
    return)()