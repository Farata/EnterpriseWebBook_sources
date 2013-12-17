package com.enterprisewebbook.ch8.websockets.auction.decode;

import com.enterprisewebbook.ch8.websockets.auction.message.LoginRequestMessage;
import com.google.gson.Gson;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class LoginRequestDecoder implements Decoder.Text<LoginRequestMessage> {

    @Override
    public LoginRequestMessage decode(String s) throws DecodeException {
        LoginRequestMessage resultObject = new Gson().fromJson(s, LoginRequestMessage.class);
        //System.out.println(resultObject.toString());
        return resultObject;
    }

    @Override
    public boolean willDecode(String s) {
        boolean result = s.contains("LOGIN");
        System.out.println("LoginDecoder will decode: " + result);
        return result;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
