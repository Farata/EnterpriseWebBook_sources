package com.enterprisewebbook.ch8.websockets.auction

import com.enterprisewebbook.ch8.websockets.auction.message.LoginRequestMessage
import com.google.gson.Gson
import com.ning.http.client.AsyncHttpClient
import com.ning.http.client.websocket.WebSocket
import com.ning.http.client.websocket.WebSocketTextListener
import com.ning.http.client.websocket.WebSocketUpgradeHandler
import org.glassfish.tyrus.server.Server
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import spock.lang.Shared
import spock.lang.Specification

/**
 * TODO
 *
 * @since 12/3/12
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 */
class AuctionWebSocketTest extends Specification {

    private static Logger logger = LoggerFactory.getLogger(AuctionWebSocketTest.class);

    @Shared Server server

    def setupSpec() {
        HashSet<Class<?>> beans = new HashSet<>();
        try {
            beans.add(Class.forName("com.enterprisewebbook.ch8.websockets.auction.AuctionWebSocket"))
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        server = new Server("localhost", 8080, "/child-auction", beans);
        try {
            server.start()
        } catch (IOException e) {
            println "Exception during server startup"
        } finally {
//            server.stop()
//            println "Server stopped"
        }
    }

    def "expect server is up and running"() {
        expect
        server
    }

    def "test connection"() {
        when:
        AsyncHttpClient c = new AsyncHttpClient();
        String ENDPOINT_URL = "ws://localhost:8080/child-auction/auction";
        final WebSocket w = c.prepareGet(ENDPOINT_URL)
                .execute(new WebSocketUpgradeHandler.Builder().build())
                .get();
        w.addWebSocketListener(new WebSocketTextListener() {
            public void onMessage(String message) {
                //logger.info("Message Received:  " + message);
                println message
            }

            @Override
            public void onFragment(String fragment, boolean last) {
                println fragment
            }

            public void onOpen(WebSocket websocket) {
                logger.info("WebSocket Opened");
            }

            @Override
            public void onClose(WebSocket websocket) {
                logger.info("Socket closed");
            }

            @Override
            public void onError(Throwable t) {
                logger.error("Error: {}", t);
            }
        });
        LoginRequestMessage message = new LoginRequestMessage("gamussa", "id");
        Gson gson = new Gson()
        //w.sendTextMessage(gson.toJson(message))
        w.sendTextMessage("{\"type\":\"LOGIN\",\"data\":\"gamussa\",\"auctionId\":\"first\"}");
        then:
        true
    }

    def cleanupSpec() {
        server.stop()
    }
}
