package com.enterprisewebbook.ch8.websockets.auction.message;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 12/2/12
 */
public class AuctionMessage<T> {

    private AuctionMessageType type;
    private T data;

    public String getAuctionId() {
        return auctionId;
    }

    private String auctionId;

    @Override
    public String toString() {
        return "AuctionMessage{" +
                "type=" + type +
                ", data=" + data +
                ", auctionId='" + auctionId + '\'' +
                '}';
    }

    public AuctionMessage(AuctionMessageType type, T data, String auctionId) {
        this.type = type;
        this.data = data;
        this.auctionId = auctionId;
    }

    public T getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuctionMessage that = (AuctionMessage) o;

        if (auctionId != null ? !auctionId.equals(that.auctionId) : that.auctionId != null)
            return false;
        if (!data.equals(that.data)) return false;
        if (type != that.type) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = type.hashCode();
        result = 31 * result + data.hashCode();
        result = 31 * result + (auctionId != null ? auctionId.hashCode() : 0);
        return result;
    }
}
