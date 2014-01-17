package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/3/12
 */
public class BidRequestMessage extends AuctionMessage<String> {
    public BidRequestMessage(String data, String communicationId) {
        super(AuctionMessageType.BID, data, communicationId);
    }
}
