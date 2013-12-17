package com.enterprisewebbook.ch8.websockets.auction.domain;

import com.enterprisewebbook.ch8.websockets.auction.message.*;
import com.enterprisewebbook.ch8.websockets.auction.task.AuctionTimeBroadcastTask;
import com.enterprisewebbook.ch8.websockets.auction.task.PreAuctionCountDown;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Timer;

import static com.enterprisewebbook.ch8.websockets.auction.domain.Auction.AuctionState.AUCTION_FINISHED;
import static com.enterprisewebbook.ch8.websockets.auction.domain.Auction.AuctionState.AUCTION_RUNNING;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class Auction {

    private transient Timer preAuctionTimer;

    private transient Timer auctionRunningTimer;

    private AuctionState auctionState;

    private AuctionItem item;

    public double bestBid;

    public Session bestBidder;

    public transient List<Session> participantList = new ArrayList<>();

    public void onBid(BidRequestMessage bidRequestMessage, Session client) {
        System.out.println("Bid: " + bidRequestMessage.toString());
        if (auctionState == AUCTION_RUNNING) {
            Double bid = Double.parseDouble(bidRequestMessage.getData());
            if (bid > bestBid) {
                bestBid = bid;
                bestBidder = client;
                sendPriceUpdate();
            }
        }
    }

    public void sendPriceUpdate() {
        PriceUpdateMessage priceUpdateMessage = new PriceUpdateMessage(String.valueOf(bestBid), auctionId);
        for (Session client : getParticipantList()) {
            try {
                client.getBasicRemote().sendObject(priceUpdateMessage);
            } catch (EncodeException e) {
                //TODO better error logging
                e.printStackTrace();
            } catch (IOException e) {
                //TODO better error logging
                e.printStackTrace();
            }
        }
    }

    public void sendResults() {
        if (bestBidder != null) {

            AuctionResultMessage messageToWinner = new AuctionResultMessage(String.format("Congrats! You've won %s for $%s", item.getName(), String.valueOf(bestBid)), auctionId);
            try {
                bestBidder.getBasicRemote().sendObject(messageToWinner);
            } catch (IOException e) {
                //TODO better error logging
                e.printStackTrace();
            } catch (EncodeException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
        AuctionResultMessage message = new AuctionResultMessage("Sorry, you not won", auctionId);
        for (Session client : participantList) {
            if (client != bestBidder) {
                try {
                    client.getBasicRemote().sendObject(message);
                } catch (IOException e) {
                    //TODO better error logging
                    e.printStackTrace();
                } catch (EncodeException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        }
    }

    public void switchAuctionToFinished() {
        auctionState = AUCTION_FINISHED;
        stopAuctionTimeBroadcast();
        sendResults();
    }

    private void stopAuctionTimeBroadcast() {
        auctionRunningTimer.cancel();
    }

    public String getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(String auctionId) {
        this.auctionId = auctionId;
    }

    private String auctionId;

    /**
     * @return read only list of remote clients
     */
    public List<Session> getParticipantList() {
        return Collections.unmodifiableList(participantList);
    }

    public synchronized void addClient(Session client) {
        participantList.add(client);
    }

    public synchronized void removeClient(Session session) {
        participantList.remove(session);
    }

    public Auction(AuctionItem item) {
        this.auctionState = AuctionState.AUCTION_NOT_RUNNING;
        this.item = item;
        this.bestBid = item.getStartingPrice();
    }

    public void switchAuctionToStarted() {
        auctionState = AUCTION_RUNNING;
        stopPreauctionTimeBroadcast();
        startAuctionTimeBroadcast();
    }

    private void stopPreauctionTimeBroadcast() {
        preAuctionTimer.cancel();
    }

    private void startAuctionTimeBroadcast() {
        // broadcast auction time
        auctionRunningTimer = new Timer();
        auctionRunningTimer.schedule(new AuctionTimeBroadcastTask(this, item.getBidTimeoutS()), 0, 1000);
    }

    public void onLogin(LoginRequestMessage loginRequest, Session session) throws IOException, EncodeException {
        this.addClient(session);
        LoginResponseMessage responseMessage = new LoginResponseMessage(item, auctionId);
        //session.getRemote().sendString(responseMessage.toString());
        session.getBasicRemote().sendObject(responseMessage);
        if (participantList.size() == 1) {
            startPreAuctionTimeBroadcast();
        }
    }

    private void startPreAuctionTimeBroadcast() {
        preAuctionTimer = new Timer();
        preAuctionTimer.schedule(new PreAuctionCountDown(this, item.getAuctionStartTime()), 0, 1000);
    }

    public static enum AuctionState {
        AUCTION_NOT_RUNNING, AUCTION_RUNNING, AUCTION_FINISHED;
    }

}
