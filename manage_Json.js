let listone = JSON.parse(localStorage.getItem('listone')) || [];
var filteredRoles=new Set()
let researchPlayer=''
let sortState = { column: null, ascending: true }; // tiene traccia dell'ordinamento
let legendaFasce={
  null:'',
  1:'darkred',
  2:'#CC5500',
  3:'#999900',
  4:'purple',
  5:'steelblue'
}
document.getElementById('barraRicerca').addEventListener('input',function(e){
  researchPlayer=(e.target.value).toLowerCase()
  renderTable()
})
renderTable();








function renderTable() {
  if (listone.length === 0) {
    document.getElementById('output').innerHTML = "<p>Nessun dato disponibile.</p>";
    return;
  }

  const headers = Object.keys(listone[0]);
  console.log(headers)
  let html = "<table border='1'><thead><tr>";

  // Intestazioni cliccabili
  headers.filter(value=>value!='Obiettivo').forEach(key => {
    html += `<th style="cursor:pointer" onclick="ordinaPer('${key}')">${key}</th>`; //INTESTAZIONI CLICCABILI PER ORDINARE
  });
  html += `<th>Azioni</th><th style="cursor:pointer" onclick="ordinaPer('Obiettivo')">Obiettivo</th></tr></thead><tbody>`;

  // Righe
  listone.forEach((giocatore, i) => {
    if(filteredRoles.has(giocatore['Ruolo']) || filteredRoles.size==0) { //controlla eventuali filtri ruolo
      if(((giocatore['Giocatore']).toLowerCase()).indexOf(researchPlayer)!=-1 || researchPlayer.trim()==""){
        
      //stampa riga
    html += `<tr style="background-color: ${legendaFasce[giocatore['fascia']]};">`;
    headers.filter(value=>value!='Obiettivo').forEach(key => {
      
      html += `<td>${giocatore[key]}</td>`;
    });
    html += `<td><button onclick="modifica(${i})">Modifica</button></td>`;
        html+=`<td><input type='checkbox' onchange="checker(event,${i})" ${giocatore['Obiettivo']}></td>`

    html += "</tr>";}
  }});

  html += "</tbody></table>";
  document.getElementById("output").innerHTML = html;
}
window.checker=function(event,index){
  let player=listone[index]
  console.log(event.target)
  player.Obiettivo = event.target.checked ? 'checked' : ''; // aggiorna entrambi i casi
  console.log(player.Obiettivo)
  localStorage.setItem('listone',JSON.stringify(listone))
//renderTable()
}
window.ordinaPer = function (colonna) {
  if (sortState.column === colonna) {
    sortState.ascending = !sortState.ascending;
  } else {
    sortState.column = colonna;
    sortState.ascending = true;
  }

  listone.sort((a, b) => {
    let valA = a[colonna];
    let valB = b[colonna];
    if(valA=='checked' && valB=='') return -1;
    if(valB=='checked'&& valA=='') return 1;
 

    // Trattamento speciale per null/undefined/vuoti
    const isEmpty = v => v === null || v === undefined || v === '';

    // Vuoti sempre alla fine
    if (isEmpty(valA) && !isEmpty(valB)) return 1;
    if (!isEmpty(valA) && isEmpty(valB)) return -1;
    if (isEmpty(valA) && isEmpty(valB)) return 0;

    // Prova a convertire in numero
    let numA = parseFloat(valA);
    let numB = parseFloat(valB);

    if (!isNaN(numA) && !isNaN(numB)) {
      valA = numA;
      valB = numB;
    }

    if (valA < valB) return sortState.ascending ? -1 : 1;
    if (valA > valB) return sortState.ascending ? 1 : -1;
    return 0;
  });

  renderTable();
};


window.modifica = function(index) {
  const player = listone[index];
  const nuovoPrezzo = prompt("Nuovo prezzo per " + player.Giocatore + ":");
  const nuovaFascia = prompt("Nuova fascia (DA 1 A 5) per " + player.Giocatore + ":");

  if (nuovoPrezzo !== null && nuovoPrezzo >= 1) player.prezzo = nuovoPrezzo;
  if (nuovaFascia !== null && nuovaFascia >= 1) player.fascia = nuovaFascia <=5 ? nuovaFascia: 5;

  localStorage.setItem('listone', JSON.stringify(listone));
  renderTable();
};



