fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => showCountryNames(data))

    function showCountryNames(countries){
        countries.forEach(print);
    }

    function print(country) {
        const countryList = document.getElementById('countries-div');
        const item = document.createElement('div');
        item.innerHTML = `
            <button style="width:100%;">${country.name}</button>
        `;
        countryList.appendChild(item);
    }

    document.getElementById('countries-div').addEventListener('click', event => {
        const selectedCountry = event.target.innerText;
        document.getElementById("selected-country").innerText = `Details of ${selectedCountry}`;

        fetch('https://restcountries.eu/rest/v2/name/'+ selectedCountry)
        .then(response => response.json())
        .then(data => {
            const countryDetailsList = document.getElementById('country-details-list');
            countryDetailsList.innerHTML = '';
            countryDetailsList.innerHTML = `<img style="border: 2px solid rebeccapurple; padding: 3px; float: right; width: 200px; margin-right: 20px;" src="${data[0].flag}">`;
            for (const prop in data[0]) {
                const item = document.createElement('li');

                if(data[0][prop][0] instanceof Object){ 
                    let objProb = '';
                    for (const prop2 in data[0][prop][0]){
                        objProb += ` <strong>${prop2}</strong>: ${data[0][prop][0][prop2]}; `;
                    }
                    item.innerHTML = `<strong>${prop}</strong> = ${objProb}`;
                }
                else{
                    item.innerHTML = `<strong>${prop}</strong> = ${data[0][prop]}`;
                }
                countryDetailsList.appendChild(item);
            }
        })
    });