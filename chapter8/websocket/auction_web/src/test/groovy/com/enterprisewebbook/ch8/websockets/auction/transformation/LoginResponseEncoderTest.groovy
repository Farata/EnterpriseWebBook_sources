package com.enterprisewebbook.ch8.websockets.auction.transformation

import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItem
import com.enterprisewebbook.ch8.websockets.auction.domain.AuctionItemBuilder
import com.enterprisewebbook.ch8.websockets.auction.encode.LoginResponseEncoder
import com.enterprisewebbook.ch8.websockets.auction.message.LoginResponseMessage
import com.google.gson.Gson
import spock.lang.Specification

/**
 * TODO
 *
 * @since 12/3/12
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 */
class LoginResponseEncoderTest extends Specification {
    String expectedJson = """{"type":"LOGIN","data":{"name":"Painting","description":"Fancy","startingPrice":1000.0,"auctionStartTime":1354517305710,"bidTimeoutS":30},"auctionId":"first"}"""
    def "test json"() {
        when:
        AuctionItem item = new AuctionItemBuilder()
                .withName("Painting")
                .withDescription("Fancy")
                .withStartingPrice(1000)
                .withAuctionStartTime(System.currentTimeMillis() + 6000)
                .withBidTimeoutS(30)
                .buildAuctionItem();
        LoginResponseMessage message = new LoginResponseMessage(item, "first")
        LoginResponseEncoder encoder = new LoginResponseEncoder();
        //println encoder.encode(message)
        LoginResponseMessage expected = new Gson().fromJson(expectedJson, LoginResponseMessage.class)

        then:
        expected.equals(message)
    }
}
