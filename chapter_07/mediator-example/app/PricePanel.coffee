define [], ()->
  class PricePanel
    mediator = {}
    onBidClick: (currentPrice)=>
      console.log("Bid clicked on price #{currentPrice}")
      @getMediator().broadcast("PriceUpdate", [currentPrice])
      return
    onAskClick: ()=>
      console.log("Ask clicked")
      return
    getMediator: () =>
      mediator
    setMediator: (m) =>
      mediator = m