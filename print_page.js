function aggiungiSquadra() {

  const contenitore = document.getElementById("contenitoreSquadre");
  const ultimoNumero = Array.from(contenitore.children) //ottieni numero degli ultimi container creati
    .map(div => parseInt(div.id.replace('containerSquadra', '')))
    .filter(n => !isNaN(n))
    .reduce((max, n) => Math.max(max, n), 0);

  const nuovoNumero = ultimoNumero + 1;

  const nuovaSquadra = []; 
  localStorage.setItem('squadra' + nuovoNumero, JSON.stringify(nuovaSquadra));
  renderSquadra(nuovoNumero, nuovaSquadra);
}

   

   function renderSquadra(num, team) { 
  const contenitore = document.getElementById("contenitoreSquadre");
  const div = document.createElement("div");
  div.id = "containerSquadra" + num;
  div.classList.add("card-squadra");
  div.innerHTML = printRows(team,num);
  contenitore.appendChild(div);
  aggiornaTotale(num); // Aggiorna i totali all'avvio
}

function ripristinaPagina() {
  const contenitore = document.getElementById("contenitoreSquadre");
  contenitore.innerHTML = ""; 

  Object.keys(localStorage)
    .filter(key => key.startsWith("squadra"))
    .sort((a,b)=>{return a[a.length-1]>b[b.length-1] ?  1: -1}) //ordina la stampa delle squadre
    .forEach(key => {
      console.log(key)
      const numSquadra = key.replace("squadra", "");
      const giocatori = JSON.parse(localStorage.getItem(key));
      renderSquadra(numSquadra, giocatori);
    });
}
function printRows(team,num){
  const [numPor, numDif, numCC, numAtt] = checkNumeriRuoli(); 

  const ruoliRender = [
    ["PORTIERI", "P", numPor],
    ["DIFENSORI", "D", numDif],
    ["CENTROCAMPISTI", "C", numCC],
    ["ATTACCANTI", "A", numAtt]
  ];

  let html = "";

  for (const [titolo, codiceRuolo, numero] of ruoliRender) {
    html += `<h2>${titolo}</h2><table>
      <tr><th>Giocatore</th><th>Quotazione</th><th>Prezzo</th></tr>`;

    const playersRuolo = team.filter(p => p.Ruolo === codiceRuolo);
    for (let i = 0; i < numero; i++) {
      const player = playersRuolo[i];
      html += `<tr><td>
        <select class='sel${num}' onchange='AggiornaQuotazione(this)' data-prev='${player?.["Cod."] || ""}'>
          <option value='0'>SCEGLI</option>
          ${listone.filter(p => p.Ruolo === codiceRuolo).map(p => 
            `<option value='${p["Cod."]}' ${checkSelection(player,p)}>
              ${p["Giocatore"]}${checkSelection(player,p)=="selected"? '':(['--',p["Quotazione"]]).join('')}
            </option>`).join("")}
        </select></td>
        <td class='quotazione'>${player ? player.Quotazione : ""}</td>
        <td class='prezzo'><input type='number' value='${player?.prezzo || ""}' onchange='aggiornaPrezzoGiocatore(this)'></td>
      </tr>`;
    }

    html += `</table><h1>Totale:</h1><h2 id='totale_${codiceRuolo}_${num}'>0</h2>`;
  }
    html += `<h1>TOTALE SQUADRA:</h1><h2 id='totale_${num}'>0</h2>
           <button onclick='eliminaSquadra(${num})'>Elimina</button>`;
           return html;
}


    