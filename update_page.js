function aggiornaPrezzoGiocatore(inputElement) {
  const tr = inputElement.closest("tr");
  const select = tr.querySelector("select");
  const codice = select.value;
  const nuovoPrezzo = Number(inputElement.value);
    
  if (!codice) return;

  //trova il numero squadra)
  const numDiv = inputElement.closest('div').id.replace('containerSquadra', '');
  const squadraKey = 'squadra' + numDiv;

  // Carica la squadra dal localStorage
  let team = JSON.parse(localStorage.getItem(squadraKey)) || [];

  // Trova il giocatore nella squadra e aggiorna il prezzo
  team = team.map(player => {
    if (player['Cod.'] == codice) {
      return { ...player, prezzo: nuovoPrezzo };
    }
    return player;
  });

  // Salva la squadra aggiornata nel localStorage
  localStorage.setItem(squadraKey, JSON.stringify(team));
aggiornaTotale(numDiv)
}

 function aggiornaTotale(numDiv) {
  const team = JSON.parse(localStorage.getItem(`squadra${numDiv}`)) || [];
  let totPor = 0, totDif = 0, totCc = 0, totAtt = 0;

  for (let player of team) {
    let prezzo = Number(player['prezzo']);
    if (isNaN(prezzo)) continue; // Salta se il prezzo non è valido

    const ruolo = player['Ruolo'].toUpperCase();
    [totPor,totDif,totCc,totAtt]=increaseTot(totPor,totDif,totCc,totAtt,ruolo,prezzo)
  }

  const totale = totPor + totDif + totCc + totAtt;
  
  printTotals(numDiv,totPor,totDif,totCc,totAtt,totale)

  console.log(`Squadra ${numDiv} - Totale: ${totale} (P: ${totPor}, D: ${totDif}, C: ${totCc}, A: ${totAtt})`);
}

    function AggiornaQuotazione(selectElement) {
      //ottieni giocatore e suoi attributi
      const selectedPlayer = listone.find(p => p['Cod.'] == selectElement.value);
      const tdQuotazione = selectElement.closest('tr').querySelector('.quotazione');
      const inputPrezzo = selectElement.closest('tr').querySelector('.prezzo input');
      const numDiv = selectElement.closest('div').id.replace('containerSquadra', '');

      //precedente selezionato
      const prevCodice = selectElement.getAttribute('data-prev');
      //attuale selezionato
      const newCodice = selectElement.value;
//in caso di "SCEGLI" come selezione
      if (!selectedPlayer || selectedPlayer == undefined || newCodice == "0") {
        tdQuotazione.textContent = '';
        inputPrezzo.value = '';

        // rimuovi solo il giocatore deselezionato
        let team = JSON.parse(localStorage.getItem('squadra' + numDiv)) || [];
        team = team.filter(player => player['Cod.'] != prevCodice);
        localStorage.setItem('squadra' + numDiv, JSON.stringify(team));
        aggiornaTotale(numDiv);
        
        return;
      }
// ripristino il testo della option del selezionato precedente
if (prevCodice && prevCodice !== "0") {
  const prevPlayer = listone.find(p => p["Cod."] == prevCodice);
  if (prevPlayer) {
    Array.from(selectElement.options).forEach(opt => {
      if (opt.value === prevCodice) {
        opt.textContent = `${prevPlayer["Giocatore"]}--${prevPlayer["Quotazione"]}`;
      }
    });
  }
}

      
      

      // salva il codice attuale per futuro controllo
      selectElement.setAttribute('data-prev', newCodice);
      //modifica attributi 
      tdQuotazione.textContent = selectedPlayer['Quotazione'];
      selectElement.options[selectElement.selectedIndex].textContent =
        selectElement.options[selectElement.selectedIndex].textContent.split('--')[0];

      inputPrezzo.value = selectedPlayer['prezzo'] || selectedPlayer['Quotazione'];
      selectedPlayer.prezzo = inputPrezzo.value;
      //salvataggio in json localStorage
      const team = [];
      let i = 0;

      Array.from(document.getElementsByClassName(`sel${numDiv}`)).forEach(sel => {
        if (newCodice == sel.value) {
          i++;
          //controllo ripetizione selezione
          if (i == 2) {
            tdQuotazione.textContent = '';
            inputPrezzo.value = '';
            alert("ATTENTO È GIÀ INSERITO");
            sel.selectedIndex = 0;
          }
        }
        if (sel.value && i !== 2) {
          const player = listone.find(p => p['Cod.'] == sel.value);
          if (player) {
            const prezzoInput = sel.closest('tr').querySelector('input');
            const prezzo = prezzoInput.value || player['Quotazione'];
            team.push({ ...player, prezzo: prezzo });
          }
        }
      });

      localStorage.setItem('squadra' + numDiv, JSON.stringify(team));
      aggiornaTotale(numDiv);
    }

     function eliminaSquadra(num) {
      const container = document.getElementById('containerSquadra' + num);
      if (container) container.remove();
      localStorage.removeItem('squadra' + num);
    }

    ////////////////////////////////////////////////////////
    