package com.enterprisewebbook.ch8.websockets.auction.task;

import com.enterprisewebbook.ch8.websockets.auction.domain.Auction;
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionTimeBroadcastMessage;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.TimerTask;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/14/12
 */
public class AuctionTimeBroadcastTask extends TimerTask {

    private final Auction owner;
    private int timeout;

    public AuctionTimeBroadcastTask(Auction owner, int timeout) {
        this.owner = owner;
        this.timeout = timeout;
    }


    @Override
    public void run() {
        if (timeout < 0) {
            owner.switchAuctionToFinished();

        } else {
            if (!owner.getParticipantList().isEmpty()) {
                AuctionTimeBroadcastMessage message = new AuctionTimeBroadcastMessage(timeout, owner.getAuctionId());
                for (Session s : owner.getParticipantList()) {
                    try {
                        s.getBasicRemote().sendObject(message);
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (EncodeException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        timeout--;
    }
}
