define (require, exports, module)->
  module.exports = AuctionMessage

class AuctionMessage
  constructor: (@type, @data, @auctionId) ->

  toJson: ()->
    JSON.stringify(this)

console.log "auctionMessageDto module loaded"