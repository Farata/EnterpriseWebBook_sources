package com.enterprisewebbook.ch8.websockets.auction.message;

import static com.enterprisewebbook.ch8.websockets.auction.message.AuctionMessageType.PRICE_UPDATE;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/3/12
 */
public class PriceUpdateMessage extends AuctionMessage<String> {
    public PriceUpdateMessage(String price, String auctionId) {
        super(PRICE_UPDATE, price, auctionId);
    }
}
