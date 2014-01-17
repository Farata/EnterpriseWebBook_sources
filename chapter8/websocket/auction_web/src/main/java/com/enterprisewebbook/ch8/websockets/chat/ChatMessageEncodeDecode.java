package com.enterprisewebbook.ch8.websockets.chat;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.stream.JsonGenerator;
import javax.websocket.*;
import java.io.StringReader;
import java.io.StringWriter;

/**
 * TODO
 *
 * @author Viktor Gamov (viktor.gamov@faratasystems.com)
 * @since 11/21/12
 */
public class ChatMessageEncodeDecode implements Decoder.Text<ChatMessage>, Encoder.Text<ChatMessage> {
    @Override
    public ChatMessage decode(String s) throws DecodeException {
        ChatMessage m = new ChatMessage();
        try (JsonReader reader = Json.createReader(new StringReader(s))) {
            JsonObject object = reader.readObject();
            m.setMessageId(object.getJsonNumber("messageId").intValue());
            m.setFrom(object.getString("from").toString());
            m.setBody(object.getString("body").toString());
        }
        return m;
    }

    @Override
    public String encode(ChatMessage object) throws EncodeException {
        StringWriter result = new StringWriter();
        try (JsonGenerator generator = Json.createGenerator(result)) {

            generator.writeStartObject()
                    .write("messageId", object.getMessageId())
                    .write("from", object.getFrom())
                    .write("body", object.getFrom())
                    .writeEnd();
        }
        return result.toString();
    }

    @Override
    public boolean willDecode(String s) {
        return true;
    }


    @Override
    public void init(EndpointConfig config) {
    }

    @Override
    public void destroy() {

    }
}
