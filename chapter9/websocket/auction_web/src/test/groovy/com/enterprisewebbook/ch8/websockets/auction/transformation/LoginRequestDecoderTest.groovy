package com.enterprisewebbook.ch8.websockets.auction.transformation

import com.enterprisewebbook.ch8.websockets.auction.decode.LoginRequestDecoder
import spock.lang.Specification
/**
 * TODO
 *
 * @since 12/2/12
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 */
class LoginRequestDecoderTest extends Specification {

    LoginRequestDecoder decoder
    String expectedJson = """{"type":"LOGIN","data":"gamussa","auctionId":"i    d"}"""

    def setup() {
        decoder = new LoginRequestDecoder();
    }

}
