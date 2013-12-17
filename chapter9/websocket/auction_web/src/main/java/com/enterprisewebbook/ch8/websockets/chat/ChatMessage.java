package com.enterprisewebbook.ch8.websockets.chat;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 11/21/12
 */
public class ChatMessage {

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    private Integer messageId;
    private String from;



    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    private String body;

    @Override
       public boolean equals(Object o) {
           if (this == o) return true;
           if (o == null || getClass() != o.getClass()) return false;

           ChatMessage that = (ChatMessage) o;

           if (!body.equals(that.body)) return false;
           if (!from.equals(that.from)) return false;
           if (!messageId.equals(that.messageId)) return false;

           return true;
       }

       @Override
       public int hashCode() {
           int result = messageId.hashCode();
           result = 31 * result + from.hashCode();
           result = 31 * result + body.hashCode();
           return result;
       }

       @Override
       public String toString() {
           return "ChatMessage{" +
                   "messageId=" + messageId +
                   ", from='" + from + '\'' +
                   ", body='" + body + '\'' +
                   '}';
       }
}
