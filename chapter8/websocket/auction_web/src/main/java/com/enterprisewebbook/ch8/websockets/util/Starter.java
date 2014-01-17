package com.enterprisewebbook.ch8.websockets.util;

import com.enterprisewebbook.ch8.websockets.auction.AuctionWebSocket;
import org.glassfish.tyrus.server.Server;

import javax.websocket.DeploymentException;
import java.io.IOException;
import java.util.HashSet;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/4/12
 */
public class Starter {
    public static void main(String[] args) throws DeploymentException {
        HashSet<Class<?>> beans = new HashSet<Class<?>>();
        beans.add(AuctionWebSocket.class);
        //beans.add(PhotoUploaderWebSocket.class);

        Server server = new Server("localhost", 8080, "/child-auction", beans);

        try {
            server.start();
            System.out.println("Press any key to stop the server...");
            System.in.read();
        } catch (IOException ioe) {
            System.out.println("weird...");
        } finally {
            server.stop();
            System.out.println("Server stopped.");
        }
    }
}
