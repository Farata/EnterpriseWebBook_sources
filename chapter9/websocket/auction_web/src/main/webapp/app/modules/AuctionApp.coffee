define (require, exports, module)->
  module.exports = AuctionApp

  AuctionMessage = require "modules/AuctionMessage"
  Auction = require "modules/Auction"

class AuctionApp

  webSocket = {}
  bid_prices = {}
  remainingTime = {}
  myCombo = {}
  resultText = {}
  myLogin = {}
  photo = {}
  itemName = {}
  itemDescription = {}

  auctions = {}

  constructor: ()->

  launch: =>
    bid_prices = document.getElementById "bid_prices"
    remainingTime = document.getElementById "remainingTimeID"
    resultText = document.getElementById "result"
    myCombo = document.getElementById "comboID"
    myLogin = document.getElementById "loginID"
    photo = document.getElementById "photoId"
    itemName = document.getElementById "itemNameId"
    itemDescription = document.getElementById "itemDescription"

    if(window.WebSocket)
      # wsUrl= "ws://" + document.location.host + document.location.pathname + "auction";
      webSocket = new WebSocket("ws://localhost:8080/child-auction/auction";)
      webSocket.onopen = =>
        console.log("connection open...")
        @getAuctionsList()
        return
      webSocket.onclose = (closeEvent)=>
        console.log("close code #{closeEvent.code}")
        return
      webSocket.onmessage = (messageEvent) =>
        console.log ("data from server: #{messageEvent.data}")
        if (typeof messageEvent.data is "string")
          @handleMessage messageEvent.data
          return
      webSocket.onerror = =>
        console.log("websocket error")
        return

  handleMessage: (data)->
    message = JSON.parse(data)

    switch message.type
      when "AUCTIONS_LIST"
        console.log("got auction list")
        #@auctions = (new Auction o for o in message.data)
        @auctions = message.data
        #buildComboBox.call(this, @auctions)
        buildComboBox.call(this, message.data)
      when "LOGIN"
        writeToScreen "Lets try to win #{message.data.description} #{message.data.name}"
        bid_prices.value = message.data.startingPrice
      when "PREAUCTION_TIME_BROADCAST"
        console.log "preauction message"
      when "AUCTION_TIME_BROADCAST"
        remainingTime.value = message.data
      when "PRICE_UPDATE"
        bid_prices.value = message.data
        console.log "price update message"
      when "RESULT"
        writeToScreen message.data
      else
        console.log "unknown message"

  getAuctionsList: ->
    auctionListMessage = new AuctionMessage "AUCTIONS_LIST", 'gime', "-1"
    @sendMessage auctionListMessage
    return

  buildComboBox = (auctions) =>
    myCombo.add(new Option("#{auction.item.description} - #{auction.item.name} ",
      auction.auctionId)) for auction in auctions

    myCombo.selectedIndex = 0;
    photo.setAttribute("src", auctions[0].item.photoUrl)
    itemName.textContent = auctions[0].item.name
    itemDescription.textContent = auctions[0].item.description
    return

  sendMessage: (auctionMessage) =>
    if webSocket.readyState == 1
      webSocket.send auctionMessage.toJson()
      return
    else
      console.log("offline")

  gotoAuction: (login, auctionId) =>
    loginMessage = new AuctionMessage "LOGIN", login, auctionId
    @sendMessage loginMessage
    return

  placeBid: (myBid, auctionId)->
    bidMessage = new AuctionMessage "BID", myBid, auctionId
    @sendMessage bidMessage

  updateControls: () =>
    photo.setAttribute("src", @auctions[myCombo.selectedIndex].item.photoUrl)
    itemName.textContent = @auctions[myCombo.selectedIndex].item.name
    itemDescription.textContent = @auctions[myCombo.selectedIndex].item.description

  writeToScreen = (message)->
    output = document.getElementById("output")
    pre = document.createElement "p"
    pre.className = "badge badge-info"
    pre.style.wordWrap = "break-word"
    pre.innerHTML = message
    output.appendChild pre

console.log "auctionApp module loaded"


