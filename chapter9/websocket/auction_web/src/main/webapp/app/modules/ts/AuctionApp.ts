class AuctionItem {
    constructor(public name:string, public description:string, public startingPrice:number, public auctionStartTime:number, public bidTimeoutS:number, public photoUrl?:string) {

    }

    toJson() {
        return JSON.stringify(this);
    }
}

class Auction {
    constructor(public auctionState, public item:AuctionItem, public bestBid:number, public auctionId) {

    }

    toJson() {
        return JSON.stringify(this);
    }
}

class AuctionMessage {
    type:string;
    data:string;
    auctionId:number;

    constructor(object:any) {
        this.auctionId = object['auctionId'];
        this.type = object['type'];
        this.data = object['data'];
    }

    toJson() {
        return JSON.stringify(this);
    }
}

class AuctionApp {

    private _auctions:Array<Auction>;

    get auctions():Array<Auction> {
        return this._auctions;
    }

    private webSocket:WebSocket;

    // HTML Elements
    private bidPrices:HTMLElement;
    private remainingTime:HTMLLabelElement;
    private resultText:HTMLInputElement;
    private myCombo:HTMLSelectElement;
    private myLogin:HTMLElement;
    private photo:HTMLImageElement;
    private itemName:HTMLElement;
    private itemDescription:HTMLElement;


    constructor(public webSocketUrl:string) {
        this.bidPrices = document.getElementById("bid_prices");
        this.remainingTime = <HTMLLabelElement>document.getElementById("remainingTimeID");
        this.resultText = <HTMLInputElement>document.getElementById("result");
        this.myCombo = <HTMLSelectElement>document.getElementById("comboID");
        this.myLogin = document.getElementById("loginID");
        this.photo = <HTMLImageElement>document.getElementById("photoId");
        this.itemName = document.getElementById("itemNameId");
        this.itemDescription = document.getElementById("itemDescription");
    }

    prepareWebSocket() {
        if (window['WebSocket']) {
            this.webSocket = new WebSocket(this.webSocketUrl);

            // onOpen handler
            this.webSocket.onopen = function (event:Event) {
                console.log("connection open...");
                this.getAuctionsList();
            };

            // onClose handler
            this.webSocket.onclose = function (closeEvent:CloseEvent) {
                console.log("close code " + closeEvent.code + " and reason" + closeEvent.reason);
            };

            // onMessage handler
            this.webSocket.onmessage = function (messageEvent:any) {
                //log data
                var data = messageEvent.data;
                if (typeof data === 'string') {
                    this.handleMessage(data);
                }
            };

            //error handler
            this.webSocket.onerror = function (errorEvent:ErrorEvent) {
                console.error("WebSocket error " + errorEvent.message);
            };

        }
        else console.log("WebSocket not supported by browser");

    }

    launch() {
        this.prepareWebSocket();
    }

    getAuctionsList():void {
        var message = new AuctionMessage({
            type: "AUCTION_LIST",
            data: "gime",
            auctionType: -1
        });
        this.sendMessage(message);
    }

    gotoAuction(login:string, auctionId:number):void {
        var message = new AuctionMessage({
            type: "LOGIN",
            data: login,
            auctionId: auctionId
        });
        this.sendMessage(message);
    }

    placeBid(bid:number, auctionId:number):void {
        var message = new AuctionMessage({
            type: "BID",
            data: bid,
            auctionId: auctionId
        });
        this.sendMessage(message);
    }

    updateControls():void {
        this.photo.setAttribute("src", this.auctions[this.myCombo.selectedIndex].item.photoUrl);
        this.itemName.textContent = this.auctions[this.myCombo.selectedIndex].item.name;
        this.itemDescription.textContent = this.auctions[this.myCombo.selectedIndex].item.description;
    }

    sendMessage(message:AuctionMessage):void {
        if (this.webSocket.readyState === 1) {
            this.webSocket.send(message.toJson());
        }
    }

    static writeToScreen(message:AuctionMessage):void {
        var output = document.getElementById("output");
        var pre = document.createElement("p");
        pre.className = "badge badge-info"
        pre.style.wordWrap = "break-word"
        pre.innerHTML = message.toString();
        output.applyElement(pre);
    }

    buildComboBox(auctions:Array<Auction>):void {
        var auction, i, len;
        for (i = 0, len = auctions.length; i < len; i++) {
            auction = auctions[i];
            this.myCombo.add(new Option("" + auction.item.description + " - " + auction.item.name + " ", auction.auctionId));
        }
        this.myCombo.selectedIndex = 0;
        this.photo.setAttribute("src", auctions[0].item.photoUrl);
        this.itemName.textContent = auctions[0].item.name;
        this.itemDescription.textContent = auctions[0].item.description;
    }

    handleMessage(data:string):void {
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
    }
}