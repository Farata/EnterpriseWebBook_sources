define ["newContentLoader", "auctionApp"], (contentLoader, AuctionApp) ->
  console.log "way-to-give module is loaded"
  wayToGive = ->
    rendered: false,
    startAuction: ()->
      auctionApp = new AuctionApp()
      myCombo = document.getElementById("comboID")
      myLogin = document.getElementById("loginID")
      myCombo.addEventListener "change", ((event) ->
        auctionApp.updateControls()
        false
      ), false
      document.getElementById("gotoAuction-button").onclick = ->
        auctionApp.gotoAuction myLogin.value, myCombo.options[myCombo.selectedIndex].value
        false

      myBid = document.getElementById("bidInput")
      document.getElementById("bid_button").onclick = (e) ->
        #e.stopPropagation();
        #e.preventDefault();
        auctionApp.placeBid myBid.value, myCombo.options[myCombo.selectedIndex].value
        false

      auctionApp.launch()
      console.log "auctionApp module is launched"
    render: () ->
      whatWeDoButton = "way-to-give"
      newContainerID = "way-to-give-container"
      dataUrl = "assets/html-includes/way-to-give.html"
      contentLoader.getNewContent whatWeDoButton, newContainerID, dataUrl
      @rendered = true
      console.log "way-to-give module is rendered"
      return
    init: ->
      console.log "way-to-give init"

  wayToGive