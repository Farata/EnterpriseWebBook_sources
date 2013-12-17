package com.enterprisewebbook.ch8.websockets.auction.message;

import java.util.List;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class AuctionListResponseMessage extends AuctionMessage<List> {
    public AuctionListResponseMessage(List data, String auctionId) {
        super(AuctionMessageType.AUCTIONS_LIST, data, auctionId);
    }
}
