var tableContainer = document.getElementById('table-container');
var addedProjects = []; // Array pentru a stoca ID-urile proiectelor deja adăugate în tabel

function createTable(data) {
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');

  // Creare linie de antet
  var headerRow = document.createElement('tr');

  var nameHeader = document.createElement('th');
  nameHeader.textContent = 'Denumire';
  headerRow.appendChild(nameHeader);

  var descriptionHeader = document.createElement('th');
  descriptionHeader.textContent = 'Descriere';
  headerRow.appendChild(descriptionHeader);

  var costHeader = document.createElement('th');
  costHeader.textContent = 'Cost Lunar';
  headerRow.appendChild(costHeader);

  var linkHeader = document.createElement('th');
  linkHeader.textContent = 'Angajati';
  headerRow.appendChild(linkHeader);

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add('table');

  tableContainer.innerHTML = '';

  data.forEach(function (project) {
    // Verifică dacă proiectul a fost deja adăugat în tabel
    if (addedProjects.includes(project.idProiect)) {
      return; // Sari peste adăugarea duplicatelor
    }

    var row = document.createElement('tr');

    var nameCell = document.createElement('td');
    nameCell.textContent = project.denumire;
    row.appendChild(nameCell);

    var descriptionCell = document.createElement('td');
    descriptionCell.textContent = project.descriere;
    row.appendChild(descriptionCell);

    var costCell = document.createElement('td');
    costCell.textContent = project.costLunar;
    row.appendChild(costCell);

    var linkCell = document.createElement('td');
    var link = document.createElement('a');
    link.href = 'Angajati.html?object=' + encodeURIComponent(JSON.stringify(project));
    link.textContent = 'Angajati';
    linkCell.appendChild(link);
    row.appendChild(linkCell);

    tbody.appendChild(row);

    addedProjects.push(project.idProiect); // Adaugă ID-ul proiectului în lista de proiecte adăugate
  });

  table.appendChild(tbody);
  table.classList.add('table');

  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

function fetchData() {
  fetch('http://localhost:8080/api/v1/proiecte')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      createTable(data);
    })
    .catch(function(error) {
      console.log('A apărut o eroare:', error);
    });

}

function filterTable() {
  var input = document.getElementById('filter-input').value.toLowerCase();
  var rows = document.querySelectorAll('#table-container table tbody tr');

  rows.forEach(function(row) {
    var name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    var description = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    var cost = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

    if (name.includes(input) || description.includes(input) || cost.includes(input)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function sortTable(columnIndex, dataType) {
  var rows = Array.from(document.querySelectorAll('#table-container table tbody tr'));

  rows.sort(function(a, b) {
    var aValue = a.querySelector('td:nth-child(' + columnIndex + ')').textContent;
    var bValue = b.querySelector('td:nth-child(' + columnIndex + ')').textContent;

    if (dataType === 'string') {
      return aValue.localeCompare(bValue);
    } else if (dataType === 'number') {
      return parseFloat(aValue) - parseFloat(bValue);
    }
  });

  var tbody = document.querySelector('#table-container table tbody');

  tbody.innerHTML = '';

  rows.forEach(function(row) {
    tbody.appendChild(row);
  });
}

// ...

function addNewEmployee() {
    // Obțineți valorile câmpurilor formularului
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var position = document.getElementById('position').value;
    var salary = document.getElementById('salary').value;
    var project_id = document.getElementById('project-id').value;
    var hireDate = document.getElementById('hire-date').value;
  
    // Creați un obiect pentru proiect
    var project = {
       idProiect: project_id
    };

    //console.log(project.idul_proiect);
    // Creați un obiect pentru noul angajat
    var newEmployee = {
      nume: name,
      prenume: surname,
      functie: position,
      salariu: salary,
      proiect: project,
      data_angajare: hireDate
    };

    console.log(project);
  
    // Efectuați cererea POST către server
    fetch('http://localhost:8080/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(function(response) {
      if (response.ok) {
        // Cererea a fost efectuată cu succes
        // Actualizați tabela cu proiecte
        fetchData();
      } else {
        throw new Error('Eroare la adăugarea angajatului');
      }
    })
    .catch(function(error) {
      console.log('A apărut o eroare:', error);
    });
  }
  
  // Asociați funcția addNewEmployee cu evenimentul de submit al formularului
  document.getElementById('add-employee-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne acțiunea implicită de submit a formularului
    addNewEmployee();
  });
  
  // ...
  

fetchData();
