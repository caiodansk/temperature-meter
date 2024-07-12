document.querySelector(".busca").addEventListener('submit', async (event) => {
    event.preventDefault(); // não faça ação padrão

    let input = document.getElementById("searchInput").value;
    let apiKey = "0f260882de7f1984410f186f4f6ccdb8";

    if (input !== "") {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&lang=pt_br&units=metric`
        let results = await fetch(url);
        let json = await results.json();
        
        if (json.cod === 200) {
            console.log(json)
            document.querySelector(".aviso").style.display = "none";
            document.querySelector(".resultado").style.display = "block";
            document.querySelector(".titulo").innerHTML = json.name;
            document.querySelector(".tempInfo").innerHTML = json.main.temp;
            document.querySelector(".ventoInfo").innerHTML = json.wind.speed;
            
            let urlIcon = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            document.querySelector("img").setAttribute("src",urlIcon)
            document.querySelector(".ventoPonto").style.transform = `rotate(${json.wind.deg-90}deg)`
            document.getElementById("searchInput").value = "";
        }else{
            document.querySelector(".resultado").style.display = "none";
            document.querySelector(".aviso").style.display = "block";
            document.querySelector(".aviso").innerHTML = "<p>CIDADE NÃO LOCALIZADA!!</p>"
            document.getElementById("searchInput").value = "";
        }
        
    }
})




