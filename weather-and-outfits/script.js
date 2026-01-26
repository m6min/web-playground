// Note: This API key is a key of free subscription.
const apiKey = "d5ba1b11b94f8e892caecfe6dc7766f0";
const getLocation = async () => {
    document.querySelector("#location").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching location...`;
    document.querySelector("#weather").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching weather...`;
    try {
     const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
     if(!response.ok) throw new Error("Location API didn't answer.");
     const data = await response.json();
     if(data.city === undefined) document.querySelector("#location").innerHTML = `Couldn't get city info, ${data.country}`;
     else {
     document.querySelector("#location").innerHTML = `${data.city}, ${data.country}`;
     }
     getWeather(data.latitude, data.longitude);
    }
    catch(error) {
     console.log("Error at getLocation:", error);
     document.querySelector("#location").innerHTML = `We couldn't find your location. Please check console logs or reload page.`;
    }
}
const getWeather = async (lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
        const response = await fetch(url);
        const data = await response.json();
        document.querySelector("#weather").innerHTML =  `${data.weather[0].description}, ${data.main.temp}°C`;
        writeSuggestion(data.main.temp, data.weather[0].description);
    } catch (error) {
        console.log("Error at getWeather:", error);
        document.querySelector("#weather").innerHTML = "We couldn't find the information. Please check console logs, or reload page."
    }
}
class Clothes {
    constructor(name, typeOfClothe, minTemp, maxTemp) {
        this.name = name;
        this.typeOfClothe = typeOfClothe;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }
    // This method will hold if clothe (object) is required or not
    isItRequired(temp){
        return this.minTemp <= temp && this.maxTemp >= temp;
    }
}
const wardrobe = [
    new Clothes("Puffer Jacket", "outer", -100, 5),
    new Clothes("Leather Jacket", "outer", 5, 15),
    new Clothes("Windbreaker", "outer", 15, 22),

    new Clothes("Wool Sweater", "top", -100, 10),
    new Clothes("Hoodie", "top", 5, 20),
    new Clothes("T-Shirt", "top", 20, 45),

    new Clothes("Thick Sweatpants", "bottom", -30, 8),
    new Clothes("Jeans", "bottom", 8, 25),
    new Clothes("Shorts", "bottom", 25, 100)
];
const writeSuggestion = (temp, description) => {
    // first filter: for temperature, second filter: for type
    const filteredCLothes = wardrobe.filter(c => c.isItRequired(temp));
    const outers = filteredCLothes.filter(c => c.typeOfClothe === "outer");
    const tops = filteredCLothes.filter(c => c.typeOfClothe === "top");
    const bottoms = filteredCLothes.filter(c => c.typeOfClothe === "bottom");

    const getRandom = (list) => {
        if(list.length === 0) {
            return null;
        }
        let index = Math.floor(Math.random() * list.length);
        return list[index];
    }
    const outer = getRandom(outers);
    const top = getRandom(tops);
    const bottom = getRandom(bottoms);
    
    const messageEl = document.querySelector("#result");
    messageEl.innerHTML = `Because the weather is ${description}: You can wear `;
    if(outer) messageEl.innerHTML += `${outer.name}, `;
    if(top) messageEl.innerHTML += `${top.name} and `;
    if(bottom) messageEl.innerHTML += `${bottom.name}.`;
    
}
getLocation();