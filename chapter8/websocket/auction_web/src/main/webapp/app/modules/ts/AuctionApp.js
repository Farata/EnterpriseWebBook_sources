var AuctionItem = (function () {
    function AuctionItem(name, description, startingPrice, auctionStartTime, bidTimeoutS, photoUrl) {
        this.name = name;
        this.description = description;
        this.startingPrice = startingPrice;
        this.auctionStartTime = auctionStartTime;
        this.bidTimeoutS = bidTimeoutS;
        this.photoUrl = photoUrl;
    }
    AuctionItem.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return AuctionItem;
})();

var Auction = (function () {
    function Auction(auctionState, item, bestBid, auctionId) {
        this.auctionState = auctionState;
        this.item = item;
        this.bestBid = bestBid;
        this.auctionId = auctionId;
    }
    Auction.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return Auction;
})();

var AuctionMessage = (function () {
    function AuctionMessage(object) {
        this.auctionId = object['auctionId'];
        this.type = object['type'];
        this.data = object['data'];
    }
    AuctionMessage.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return AuctionMessage;
})();

var AuctionApp = (function () {
    function AuctionApp(webSocketUrl) {
        this.webSocketUrl = webSocketUrl;
        this.bidPrices = document.getElementById("bid_prices");
        this.remainingTime = document.getElementById("remainingTimeID");
        this.resultText = document.getElementById("result");
        this.myCombo = document.getElementById("comboID");
        this.myLogin = document.getElementById("loginID");
        this.photo = document.getElementById("photoId");
        this.itemName = document.getElementById("itemNameId");
        this.itemDescription = document.getElementById("itemDescription");
    }
    Object.defineProperty(AuctionApp.prototype, "auctions", {
        get: function () {
            return this._auctions;
        },
        enumerable: true,
        configurable: true
    });

    AuctionApp.prototype.prepareWebSocket = function () {
        if (window['WebSocket']) {
            this.webSocket = new WebSocket(this.webSocketUrl);

            // onOpen handler
            this.webSocket.onopen = function (event) {
                console.log("connection open...");
                this.getAuctionsList();
            };

            // onClose handler
            this.webSocket.onclose = function (closeEvent) {
                console.log("close code " + closeEvent.code + " and reason" + closeEvent.reason);
            };

            // onMessage handler
            this.webSocket.onmessage = function (messageEvent) {
                //log data
                var data = messageEvent.data;
                if (typeof data === 'string') {
                    this.handleMessage(data);
                }
            };

            //error handler
            this.webSocket.onerror = function (errorEvent) {
                console.error("WebSocket error " + errorEvent.message);
            };
        } else
            console.log("WebSocket not supported by browser");
    };

    AuctionApp.prototype.launch = function () {
        this.prepareWebSocket();
    };

    AuctionApp.prototype.getAuctionsList = function () {
        var message = new AuctionMessage({
            type: "AUCTION_LIST",
            data: "gime",
            auctionType: -1
        });
        this.sendMessage(message);
    };

    AuctionApp.prototype.gotoAuction = function (login, auctionId) {
        var message = new AuctionMessage({
            type: "LOGIN",
            data: login,
            auctionId: auctionId
        });
        this.sendMessage(message);
    };

    AuctionApp.prototype.placeBid = function (bid, auctionId) {
        var message = new AuctionMessage({
            type: "BID",
            data: bid,
            auctionId: auctionId
        });
        this.sendMessage(message);
    };

    AuctionApp.prototype.updateControls = function () {
        this.photo.setAttribute("src", this.auctions[this.myCombo.selectedIndex].item.photoUrl);
        this.itemName.textContent = this.auctions[this.myCombo.selectedIndex].item.name;
        this.itemDescription.textContent = this.auctions[this.myCombo.selectedIndex].item.description;
    };

    AuctionApp.prototype.sendMessage = function (message) {
        if (this.webSocket.readyState === 1) {
            this.webSocket.send(message.toJson());
        }
    };

    AuctionApp.writeToScreen = function (message) {
        var output = document.getElementById("output");
        var pre = document.createElement("p");
        pre.className = "badge badge-info";
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message.toString();
        output.applyElement(pre);
    };

    AuctionApp.prototype.buildComboBox = function (auctions) {
        var auction, i, len;
        for (i = 0, len = auctions.length; i < len; i++) {
            auction = auctions[i];
            this.myCombo.add(new Option("" + auction.item.description + " - " + auction.item.name + " ", auction.auctionId));
        }
        this.myCombo.selectedIndex = 0;
        this.photo.setAttribute("src", auctions[0].item.photoUrl);
        this.itemName.textContent = auctions[0].item.name;
        this.itemDescription.textContent = auctions[0].item.description;
    };

    AuctionApp.prototype.handleMessage = function (data) {
        var message = new AuctionMessage(JSON.parse(data));
        switch (message.type) {
            case 'AUCTION_LIST':
                break;
            case 'LOGIN':
                break;
            case 'PREAUCTION_TIME_BROADCAST':
                break;
            case 'AUCTION_TIME_BROADCAST':
                break;
            case 'PRICE_UPDATE':
                break;
            case 'RESULT':
                break;
            default:
                console.log("unknown message");
        }
    };
    return AuctionApp;
})();
//# sourceMappingURL=AuctionApp.js.map
