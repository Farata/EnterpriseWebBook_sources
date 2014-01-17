package com.enterprisewebbook.ch8.websockets.auction.decode;

import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListRequestMessage;
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionMessageType;
import com.google.gson.Gson;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class AuctionListRequestDecoder implements Decoder.Text<AuctionListRequestMessage> {
    @Override
    public AuctionListRequestMessage decode(String s) throws DecodeException {
        return new Gson().fromJson(s, AuctionListRequestMessage.class);
    }

    @Override
    public boolean willDecode(String s) {
        boolean result = s.contains(AuctionMessageType.AUCTIONS_LIST.toString());
        System.out.println("AuctionListRequestDecoder will decode: " + result);
        return result;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
