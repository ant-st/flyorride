const url = 'https://gas-price.p.rapidapi.com/europeanCountries';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7985197b4emshe06efe37db3eb4bp128b38jsna82b51411e4c',
        'X-RapidAPI-Host': 'gas-price.p.rapidapi.com'
    }
};

fetch(url, options).then(r => r.json()).then(r => console.log(r));

