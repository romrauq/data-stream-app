const ccxt = require("ccxt");

const mainFunction = async () => {
	const exchangeClient = new ccxt.bitmex();

	await exchangeClient.loadMarkets();
	let target_pair = "BTC/USD";

	setInterval(() => {
		(async () => {
			let dateObject = new Date();
			let hour = dateObject.getHours();
			let mins = dateObject.getMinutes();
			if (parseInt(dateObject.getSeconds()) < 9) {
				secs = "0" + dateObject.getSeconds();
			} else {
				secs = dateObject.getSeconds();
			}
			let current_time = `[${hour}:${mins}:${secs}]`;

			let reloadedMarket = await exchangeClient.loadMarkets(true);
			let last_price = reloadedMarket[target_pair].info.lastPrice;

			console.log(target_pair, "Last Price: " + last_price, current_time);
		})();
	}, 3000);
};

mainFunction(); // Execute/start the program.
