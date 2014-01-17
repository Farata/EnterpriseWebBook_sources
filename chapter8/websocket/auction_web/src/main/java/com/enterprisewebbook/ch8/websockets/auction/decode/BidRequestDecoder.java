package com.enterprisewebbook.ch8.websockets.auction.decode;

import com.enterprisewebbook.ch8.websockets.auction.message.AuctionMessageType;
import com.enterprisewebbook.ch8.websockets.auction.message.BidRequestMessage;
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
public class BidRequestDecoder implements Decoder.Text<BidRequestMessage> {
    @Override
    public BidRequestMessage decode(String s) throws DecodeException {
        Gson gson = new Gson();
        return gson.fromJson(s, BidRequestMessage.class);

    }

    @Override
    public boolean willDecode(String s) {
        boolean result = s.contains(AuctionMessageType.BID.toString());
        System.out.println("BidDecoder will decode: " + result);
        return result;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
