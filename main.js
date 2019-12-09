window.addEventListener("DOMContentLoaded", () => {

    const location = document.querySelector(".location-timezone");
    const temperature_deg = document.querySelector(".degree");
    const desc = document.querySelector(".description");
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         lat = position.coords.latitude;
    //         lng = position.coords.longitude;
    //     })

    // };
    let skycons = new Skycons({ "color": "white" });
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    let locat;


    function fetch_data(locat) {
        let lat = 37.8267;
        let lng = -122.4233;
        const proxy = "https://cors-anywhere.herokuapp.com/"
        const api_url = `${proxy}https://api.darksky.net/forecast/fbf88d55e3e10a5ead418c837cd85521/${lat},${lng}?units=si`;

        fetch(api_url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            let timezone = data.timezone;
            let temperature = data.currently.temperature;
            let description = data.hourly.summary;

            location.textContent = timezone;
            desc.textContent = description;
            temperature_deg.innerHTML = `${temperature}<span class="symbol">${"°"}</span>`;

            //icon

            let type = data.currently.icon.toUpperCase();
            const iconID = type.replace(/-/g, "_");
            skycons.set("icon1", Skycons[iconID]);
            skycons.play();



        });
    };
    fetch_data(locat)

})

//use it with librarie of location + google geolocation API