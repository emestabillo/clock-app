// function getHour(currentHour, currentMinutes) {
// 	const hour = document.getElementById("hour");
// 	const minutes = document.getElementById("minutes");
// 	const period = document.querySelector(".period");

// 	if (currentHour > 12) {
// 		currentHour -= 12;
// 		currentHour = "0" + currentHour;
// 		period.innerHTML = "pm";
// 	} else if (currentHour < 10) {
// 		currentHour = "0" + currentHour;
// 	} else {
// 		currentHour;
// 	}

// 	if (currentMinutes < 10) {
// 		currentMinutes = "0" + currentMinutes;
// 	}

// 	hour.innerHTML = currentHour;
// 	minutes.innerHTML = currentMinutes;
// }

// axios
// 	.all([
// 		axios.get("https://freegeoip.app/json/"), //city and country under time
// 		axios.get("https://worldtimeapi.org/api/ip"), //time based on ip address and info on expanded state
// 		axios.get("https://programming-quotes-api.herokuapp.com/quotes")
// 	])
// 	.then(
// 		axios.spread((location, time, quotes) => {
// 			console.log(location.data.region_name);

// 			//Time now
// 			const currentTime = new Date(time.data.datetime);

// 			let currentHour = currentTime.getHours();
// 			let currentMinutes = currentTime.getMinutes();


//       getHour(currentHour, currentMinutes);

//       console.log(time.data.abbreviation);
// 			console.log(time.data.day_of_year);
// 			console.log(time.data.day_of_week);
// 			console.log(time.data.week_number);

// 			// Display quotes WORKING
// 			const data = quotes.data;
// 			document.getElementById("quote").innerHTML = `${
// 				data[Math.floor(Math.random() * data.length)].en
// 			}`;
// 			// console.log(data[Math.floor(Math.random() * data.length)].en);
// 		})
// 	)
// 	.catch((err) => console.error(err));