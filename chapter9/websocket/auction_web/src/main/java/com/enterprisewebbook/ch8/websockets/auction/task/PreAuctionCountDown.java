package com.enterprisewebbook.ch8.websockets.auction.task;

import com.enterprisewebbook.ch8.websockets.auction.domain.Auction;
import com.enterprisewebbook.ch8.websockets.auction.message.PreAuctionBroadcastMessage;
import com.enterprisewebbook.ch8.websockets.util.TimeUtil;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.TimerTask;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class PreAuctionCountDown extends TimerTask {
    private final Auction owner;
    private final long startTime;

    public PreAuctionCountDown(Auction owner, long startTime) {
        this.owner = owner;
        this.startTime = startTime;
    }

    @Override
    public void run() {
        long diff = startTime - System.currentTimeMillis();


        if (diff < 0) {
            owner.switchAuctionToStarted();
        } else {
            if (!owner.getParticipantList().isEmpty()) {
                String diffString = TimeUtil.convertTimeDiffToString(diff);
                PreAuctionBroadcastMessage preAuctionBroadcastMessage = new PreAuctionBroadcastMessage(diffString, owner.getAuctionId());

                for (Session session : owner.getParticipantList()) {
                    try {
                        session.getBasicRemote().sendObject(preAuctionBroadcastMessage);
                    } catch (EncodeException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
