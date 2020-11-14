function getTime(currentHour, currentMinutes) {
	const period = document.querySelector(".period");
	const time = document.querySelector(".time-now");

	if (currentHour > 12) {
		currentHour -= 12;
		period.innerHTML = "pm";
	} else {
		currentHour;
		period.innerHTML = "am";//not working
	}

	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}

	time.innerHTML = `${currentHour} : ${currentMinutes}`;
}

function getQuote(quotesArray) {
	console.log(quotesArray)
	let index = Math.floor(Math.random() * quotesArray.length);
console.log(index);
	let chosenQuote = quotesArray[index];
console.log(chosenQuote);

	document.getElementById("quote").innerHTML = chosenQuote.text;
	
	document.querySelector(".author").innerHTML = chosenQuote.author;
}

Promise
	.all([
		axios.get("https://freegeoip.app/json/"), //city and country under time
		axios.get("https://worldtimeapi.org/api/ip"), //time based on ip address and info on expanded state
		axios.get("https://type.fit/api/quotes")
	]).catch(() => null)
	.then(
		axios.spread((location, time, quotes) => {
			console.log(location.data.region_name);

			//Time now
			const currentTime = new Date(time.data.datetime);

			let currentHour = currentTime.getHours();
			let currentMinutes = currentTime.getMinutes();


      getTime(currentHour, currentMinutes);

      console.log(time.data.abbreviation);
			console.log(time.data.day_of_year);
			console.log(time.data.day_of_week);
			console.log(time.data.week_number);

			// Display quotes WORKING
			const quotesArray = quotes.data;
			
			getQuote(quotesArray);
			
			// const chosenQuote = quote[Math.floor(Math.random() * quote.length)];

			// document.getElementById("quote").innerHTML = 
			// 	chosenQuote.en;

			// 	const author = document.querySelector(".author");
			// 	author.innerHTML = chosenQuote.author;
		})
	)
	.catch((err) => console.error(err));

document.querySelector("#refresh").addEventListener("click", getQuote);

