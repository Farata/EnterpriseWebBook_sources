package com.enterprisewebbook.ch8.websockets.auction.message;

import static com.enterprisewebbook.ch8.websockets.auction.message.AuctionMessageType.RESULT;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class AuctionResultMessage extends AuctionMessage<String> {

    public AuctionResultMessage(String message, String auctionId) {
        super(RESULT, message, auctionId);
    }
}
