class WebSocketApp

  webSocket: null

  constructor: ()->

  launch: =>
    if(window.WebSocket)
      @webSocket = new WebSocket("ws://localhost:8080/child-auction/photouploader")
      @webSocket.onopen = =>
        console.log("connection open...")
        ##@getAuctionsList()
        return
      @webSocket.onclose = (closeEvent)=>
        console.log("close code #{closeEvent.code}")
        return
      @webSocket.onmessage = (messageEvent) =>
        console.log ("data from server: #{messageEvent.data}")
        if (typeof messageEvent.data is "string")
          ##@handleMessage messageEvent.data
          return
      @webSocket.onerror = =>
        console.log("websocket error")
        return

  sendMessage: (data) =>
    if @webSocket.readyState == 1
      @webSocket.send data
      return
    else
      console.log("offline")