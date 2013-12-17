package com.enterprisewebbook.ch8.websockets.auction.encode;

import com.enterprisewebbook.ch8.websockets.auction.message.PreAuctionBroadcastMessage;
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
public class PreAuctionBroadcastEncoder implements Encoder.Text<PreAuctionBroadcastMessage> {
    @Override
    public String encode(PreAuctionBroadcastMessage object) throws EncodeException {
        Gson gson = new Gson();
        return gson.toJson(object);
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
