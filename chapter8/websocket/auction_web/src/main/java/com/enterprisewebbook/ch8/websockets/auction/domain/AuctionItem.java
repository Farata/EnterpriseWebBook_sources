package com.enterprisewebbook.ch8.websockets.auction.domain;

/**
 * Auction Item
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class AuctionItem {
    public AuctionItem(String name, int bidTimeoutS, String description, double startingPrice, long auctionStartTime, String photoUrl) {
        this.name = name;
        this.description = description;
        this.startingPrice = startingPrice;
        this.auctionStartTime = auctionStartTime;
        this.bidTimeoutS = bidTimeoutS;
        this.photoUrl = photoUrl;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public long getAuctionStartTime() {
        return auctionStartTime;
    }

    public int getBidTimeoutS() {
        return bidTimeoutS;
    }

    private final String name;

    private final String photoUrl;

    private final String description;

    private final double startingPrice;

    private final long auctionStartTime;

    private final int bidTimeoutS;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuctionItem that = (AuctionItem) o;

        if (auctionStartTime != that.auctionStartTime) return false;
        if (bidTimeoutS != that.bidTimeoutS) return false;
        if (Double.compare(that.startingPrice, startingPrice) != 0) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (photoUrl != null ? !photoUrl.equals(that.photoUrl) : that.photoUrl != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name != null ? name.hashCode() : 0;
        result = 31 * result + (photoUrl != null ? photoUrl.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        temp = startingPrice != +0.0d ? Double.doubleToLongBits(startingPrice) : 0L;
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (int) (auctionStartTime ^ (auctionStartTime >>> 32));
        result = 31 * result + bidTimeoutS;
        return result;
    }

    @Override
    public String toString() {
        return "AuctionItem{" +
                "name='" + name + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                ", description='" + description + '\'' +
                ", startingPrice=" + startingPrice +
                ", auctionStartTime=" + auctionStartTime +
                ", bidTimeoutS=" + bidTimeoutS +
                '}';
    }

    public String getPhotoUrl() {
        return photoUrl;
    }
}
