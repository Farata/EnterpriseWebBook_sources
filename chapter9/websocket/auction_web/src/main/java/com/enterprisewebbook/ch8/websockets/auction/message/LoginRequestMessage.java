package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class LoginRequestMessage extends AuctionMessage<String> {
    public LoginRequestMessage(String username, String auctionId) {
        super(AuctionMessageType.LOGIN, username, auctionId);
    }

}
