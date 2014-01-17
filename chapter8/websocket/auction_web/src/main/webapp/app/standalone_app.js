var configuration = {
    paths: {
        'auctionMessage': 'modules/AuctionMessage',
        'auction': 'modules/Auction',
        'auctionApp': 'modules/AuctionApp'
    }
};


require(configuration, ["modules/AuctionApp"], function (AuctionApp) {
    var auctionApp = new AuctionApp();
    auctionApp.launch();

    var myCombo = document.getElementById("comboID");
    var myLogin = document.getElementById("loginID");

    myCombo.addEventListener("change", function (event) {
        auctionApp.updateControls();
        return false;

    }, false);

    document.getElementById("gotoAuction-button").onclick = function () {
        auctionApp.gotoAuction(myLogin.value,
            myCombo.options[myCombo.selectedIndex].value
        );
        return false;
    };

    var myBid = document.getElementById("bidInput");

    document.getElementById("bid_button").onclick = function (e) {
        //e.stopPropagation();
        //e.preventDefault();
        auctionApp.placeBid(myBid.value, myCombo.options[myCombo.selectedIndex].value);
        return false;
    }

});