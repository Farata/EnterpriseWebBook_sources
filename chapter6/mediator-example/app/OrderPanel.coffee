define ->
  mediator = {}
  class OrderPanel
    onPriceUpdate: (price)=>
      console.log("price updated to #{price}")
    getMediator: () =>
      mediator
    setMediator: (m) =>
      mediator = m