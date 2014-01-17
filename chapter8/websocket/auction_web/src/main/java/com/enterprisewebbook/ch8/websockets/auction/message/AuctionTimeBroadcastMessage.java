package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/14/12
 */
public class AuctionTimeBroadcastMessage extends AuctionMessage<Integer> {
    public AuctionTimeBroadcastMessage(Integer data, String auctionId) {
        super(AuctionMessageType.AUCTION_TIME_BROADCAST, data, auctionId);
    }
}
