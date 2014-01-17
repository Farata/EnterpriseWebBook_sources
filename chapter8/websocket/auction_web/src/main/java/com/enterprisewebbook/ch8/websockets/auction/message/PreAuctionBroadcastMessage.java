package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/14/12
 */
public class PreAuctionBroadcastMessage extends AuctionMessage<String> {
    public PreAuctionBroadcastMessage(String auctionId, String data) {
        super(AuctionMessageType.PREAUCTION_TIME_BROADCAST, auctionId, data);
    }
}
