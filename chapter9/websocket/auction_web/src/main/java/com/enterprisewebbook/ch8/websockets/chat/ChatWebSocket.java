package com.enterprisewebbook.ch8.websockets.chat;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 11/21/12
 */
@ServerEndpoint(
        value = "/auction/chat",
        decoders = {
                ChatMessageEncodeDecode.class
        },
        encoders = {
                ChatMessageEncodeDecode.class
        }


)
public class ChatWebSocket {


    @OnOpen
    public void onOpen(Session session) {

    }


    @OnMessage
    public void onMessage(String message, Session client) {

    }

    @OnClose
    public void onClose() {

    }
}
