// Obține referința către elementul HTML care va conține detaliile
var detailsContainer = document.getElementById('details-container');

// Crearea elementului <style> și adăugarea stilurilor
var styleElement = document.createElement('style');
styleElement.textContent = `
    .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
      }
      
      .card-body {
        font-size: 14px;
      }
`;

// Extrage parametrii din URL
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

// Obține valoarea parametrului 'object' și decodifică valoarea
var objectParam = urlParams.get('object');
var objectData = JSON.parse(decodeURIComponent(objectParam));

// Funcție pentru a crea detalii obiect
function createDetails(data) {
    // Verificați dacă valoarea câmpului 'angajati' este un array de obiecte
    if (Array.isArray(data.angajati)) {
      var angajatiData = data.angajati;
  
      // Iterați prin fiecare obiect în arrayul 'angajati'
      angajatiData.forEach(function(angajat, index) {
        var card = document.createElement('div');
        card.classList.add('card');
  
        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        var totalProps = Object.keys(angajat).length;

        // Iterează prin proprietățile fiecărui obiect și construiește celulele rândului
        var count = 0;

    var labelArray = ["x", "Prenume", "Nume", "Functie", "Salariu", "Data angajarii", "x"];
  
     // Creați un element div pentru fiecare valoare în obiectul angajat
     var keys = Object.keys(angajat);
     for (var i = 1; i < keys.length - 2; i++) {
        var key = keys[i];
        var divWrapper = document.createElement('div');
        divWrapper.classList.add('card-item');

        var label = document.createElement('label');
        label.textContent = labelArray[i]+':';
        label.classList.add('card-label');

        var value = document.createElement('div');
        value.textContent = angajat[key];
        value.classList.add('card-value');

        divWrapper.appendChild(label);
        divWrapper.appendChild(value);
        cardBody.appendChild(divWrapper);
     }

  
        card.appendChild(cardBody);
        detailsContainer.appendChild(card);
      });
    }
  }
  
  
  
  

// Apelați funcția pentru a crea detalii
createDetails(objectData);
