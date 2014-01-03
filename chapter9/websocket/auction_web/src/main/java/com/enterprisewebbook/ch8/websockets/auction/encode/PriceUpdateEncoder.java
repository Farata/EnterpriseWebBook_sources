package com.enterprisewebbook.ch8.websockets.auction.encode;

import com.enterprisewebbook.ch8.websockets.auction.message.PriceUpdateMessage;
import com.google.gson.Gson;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class PriceUpdateEncoder implements Encoder.Text<PriceUpdateMessage> {
    @Override
    public String encode(PriceUpdateMessage message) throws EncodeException {
        Gson gson = new Gson();
        return gson.toJson(message);
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
