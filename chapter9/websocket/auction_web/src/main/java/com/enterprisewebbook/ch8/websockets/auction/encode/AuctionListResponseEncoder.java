package com.enterprisewebbook.ch8.websockets.auction.encode;

import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListResponseMessage;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.lang.reflect.Modifier;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class AuctionListResponseEncoder implements Encoder.Text<AuctionListResponseMessage> {
    @Override
    public String encode(AuctionListResponseMessage object) throws EncodeException {
        Gson gson = new GsonBuilder()
                .excludeFieldsWithModifiers(Modifier.TRANSIENT)
                .create();
        String result = gson.toJson(object);
        return result;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
