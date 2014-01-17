package com.enterprisewebbook.ch8.websockets.auction;

import com.enterprisewebbook.ch8.websockets.auction.decode.AuctionListRequestDecoder;
import com.enterprisewebbook.ch8.websockets.auction.decode.BidRequestDecoder;
import com.enterprisewebbook.ch8.websockets.auction.decode.LoginRequestDecoder;
import com.enterprisewebbook.ch8.websockets.auction.domain.Auction;
import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItem;
import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItemBuilder;
import com.enterprisewebbook.ch8.websockets.auction.encode.*;
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListRequestMessage;
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListResponseMessage;
import com.enterprisewebbook.ch8.websockets.auction.message.BidRequestMessage;
import com.enterprisewebbook.ch8.websockets.auction.message.LoginRequestMessage;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 11/21/12
 */
@ServerEndpoint(
        value = "/auction",
        decoders = {
                //LoginRequestDecoder.class,
                //AuctionListRequestDecoder.class,
                //BidRequestDecoder.class
        },
        encoders = {
                LoginResponseEncoder.class,
                PriceUpdateEncoder.class,
                AuctionResultEncoder.class,
                AuctionListResponseEncoder.class,
                PreAuctionBroadcastEncoder.class,
                AuctionTimeBroadcastEncoder.class
        }
)
public class AuctionWebSocket {

    private Set<Auction> auctions = new HashSet<>();

    public AuctionWebSocket() {
        AuctionItem item = new AuctionItemBuilder()
                .withName("Painting")
                .withDescription("Fancy")
                .withStartingPrice(1000)
                .withAuctionStartTime(System.currentTimeMillis() + 6000)
                .withBidTimeoutS(30)
                .withPhotoUrl("assets/img/paint.jpg")
                .buildAuctionItem();
        Auction auction = new Auction(item);
        auction.setAuctionId("first");
        AuctionItem item2 = new AuctionItemBuilder()
                .withName("Handmade hat")
                .withDescription("Awesome")
                .withStartingPrice(2000)
                .withAuctionStartTime(System.currentTimeMillis() + 6000)
                .withBidTimeoutS(30)
                .withPhotoUrl("assets/img/hat.png")
                .buildAuctionItem();
        Auction auction2 = new Auction(item2);
        auction2.setAuctionId("second");
        auctions.add(auction);
        auctions.add(auction2);
    }

    @OnOpen
    public void onOpen(Session session) throws IOException {
        System.out.println("some one is connected...");
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("close connection");
        for (Auction auction : auctions) {
            auction.removeClient(session);
        }
    }

    /**
     * Handle bid request from client and route to actual auction
     *
     * @param bidRequestMessage
     * @param client
     */
    public void onBid(BidRequestMessage bidRequestMessage, Session client) {
        String auctionId = bidRequestMessage.getAuctionId();
        for (Auction auction : auctions) {
            if (auctionId.equals(auction.getAuctionId())) {
                auction.onBid(bidRequestMessage, client);
                break;
            }
        }
    }

    public void returnAuctionsList(AuctionListRequestMessage listRequestMessage, Session client) {
        System.out.println("Auction list request: " + listRequestMessage.toString());
        List<Auction> auctionList = new ArrayList<>();
        auctionList.addAll(auctions);
        AuctionListResponseMessage responseMessage = new AuctionListResponseMessage(auctionList, "0");
        try {
            client.getBasicRemote().sendObject(responseMessage);
        } catch (EncodeException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void onLogin(LoginRequestMessage loginRequest, Session session) throws IOException, EncodeException {
        System.out.println("Login request: " + loginRequest.toString());
        String communicationId = loginRequest.getAuctionId();
        for (Auction auction : auctions) {
            if (communicationId.equals(auction.getAuctionId())) {
                auction.onLogin(loginRequest, session);
            }
        }
    }

    @OnMessage
    public void onMessage(String message, Session client) throws DecodeException, IOException, EncodeException {

        System.out.println("message from client: " + message);
        // echo
        // client.getBasicRemote().sendText(message);

        LoginRequestDecoder loginRequestDecoder = new LoginRequestDecoder();
        AuctionListRequestDecoder auctionListRequestDecoder = new AuctionListRequestDecoder();
        BidRequestDecoder bidRequestDecoder = new BidRequestDecoder();
        if (loginRequestDecoder.willDecode(message)) {
            onLogin(loginRequestDecoder.decode(message), client);
        }
        if (auctionListRequestDecoder.willDecode(message)) {
            returnAuctionsList(auctionListRequestDecoder.decode(message), client);
        }
        if (bidRequestDecoder.willDecode(message)) {
            onBid(bidRequestDecoder.decode(message), client);
        }
    }
}
