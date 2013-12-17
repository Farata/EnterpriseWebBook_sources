package com.enterprisewebbook.ch8.websockets.auction.domain;

public class AuctionItemBuilder {
    private String name;
    private String description;
    private double startingPrice;
    private long auctionStartTime;
    private int bidTimeoutS;
    private String photoUrl;

    public AuctionItemBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public AuctionItemBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public AuctionItemBuilder withStartingPrice(double startingPrice) {
        this.startingPrice = startingPrice;
        return this;
    }

    public AuctionItemBuilder withAuctionStartTime(long auctionStartTime) {
        this.auctionStartTime = auctionStartTime;
        return this;
    }

    public AuctionItemBuilder withBidTimeoutS(int bidTimeoutS) {
        this.bidTimeoutS = bidTimeoutS;
        return this;
    }

    public AuctionItemBuilder withPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
        return this;
    }

    public AuctionItem buildAuctionItem() {
        return new AuctionItem(name, bidTimeoutS, description, startingPrice, auctionStartTime, photoUrl);
    }
}