package com.enterprisewebbook.ch8.websockets.auction.encode;

import com.enterprisewebbook.ch8.websockets.auction.message.AuctionTimeBroadcastMessage;
import com.google.gson.Gson;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/14/12
 */
public class AuctionTimeBroadcastEncoder implements Encoder.Text<AuctionTimeBroadcastMessage> {
    @Override
    public String encode(AuctionTimeBroadcastMessage object) throws EncodeException {
        return new Gson().toJson(object);
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
