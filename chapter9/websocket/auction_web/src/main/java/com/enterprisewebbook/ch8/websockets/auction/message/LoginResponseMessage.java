package com.enterprisewebbook.ch8.websockets.auction.message;

import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItem;

/**
 * In case of successful login request send auction item in login response
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/3/12
 */
public class LoginResponseMessage extends AuctionMessage<AuctionItem> {
    public LoginResponseMessage(AuctionItem data, String communicationId) {
        super(AuctionMessageType.LOGIN, data, communicationId);
    }
}
