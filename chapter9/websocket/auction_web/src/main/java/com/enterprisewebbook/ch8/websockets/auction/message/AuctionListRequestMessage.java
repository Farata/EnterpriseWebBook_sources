package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class AuctionListRequestMessage extends AuctionMessage<String> {
    public AuctionListRequestMessage(String data, String auctionId) {
        super(AuctionMessageType.AUCTIONS_LIST, data, auctionId);
    }
}
