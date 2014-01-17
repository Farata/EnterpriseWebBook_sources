define (require, exports, module) ->
  module.exports = Auction

class Auction
  constructor: (@auctionState, @item, @bestBid, @auctionId) ->

  toJson: ->
    JSON.stringify(this)

console.log "auctionDto module loaded"
