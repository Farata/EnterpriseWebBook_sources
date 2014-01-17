package com.enterprisewebbook.ch8.websockets.auction.transformation

import com.enterprisewebbook.ch8.websockets.auction.domain.Auction
import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItem
import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItemBuilder
import com.enterprisewebbook.ch8.websockets.auction.encode.AuctionListResponseEncoder
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListRequestMessage
import com.enterprisewebbook.ch8.websockets.auction.message.AuctionListResponseMessage
import com.enterprisewebbook.ch8.websockets.auction.message.BidRequestMessage
import com.google.gson.Gson
import spock.lang.Specification

/**
 * TODO
 *
 * @since 12/4/12
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 */
class AuctionListResponseEncoderTest extends Specification {
    String expectedJson = """{"type":"AUCTIONS_LIST","data":[{"auctionState":"AUCTION_NOT_RUNNING","item":{"name":"Painting","description":"Fancy","startingPrice":1000.0,"auctionStartTime":6000,"bidTimeoutS":30},"bestBid":1000.0,"participantList":[],"auctionId":"first"},{"auctionState":"AUCTION_NOT_RUNNING","item":{"name":"Handmade hat","description":"Awesome","startingPrice":2000.0,"auctionStartTime":6000,"bidTimeoutS":30},"bestBid":2000.0,"participantList":[],"auctionId":"second"}],"auctionId":"0"}"""

    def "test encode"() {
        when:
        def list = []
        AuctionItem item1 = new AuctionItemBuilder()
                .withName("Painting")
                .withDescription("Fancy")
                .withStartingPrice(1000)
                .withAuctionStartTime(6000)
                .withBidTimeoutS(30)
                .buildAuctionItem();
        AuctionItem item2 = new AuctionItemBuilder()
                .withName("Handmade hat")
                .withDescription("Awesome")
                .withStartingPrice(2000)
                .withAuctionStartTime(6000)
                .withBidTimeoutS(30)
                .buildAuctionItem();
        Auction auction1 = new Auction(item1);
        auction1.setAuctionId("first");
        Auction auction2 = new Auction(item2);
        auction2.setAuctionId("second");

        list.add(auction1)
        list.add(auction2)
        def response = new AuctionListResponseMessage(list, "0")
        AuctionListResponseEncoder encoder = new AuctionListResponseEncoder();

        then:
        expectedJson.equals(encoder.encode(response));
    }

    def "test request"(){
        when:
        AuctionListRequestMessage message = new AuctionListRequestMessage("","");
        println new Gson().toJson(message);

        BidRequestMessage bid = new BidRequestMessage("100.0","first");
        println new Gson().toJson(bid)
        then:
       true
    }
}
