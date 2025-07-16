function aggiornaPrezzoGiocatore(inputElement) {
  const tr = inputElement.closest("tr");
  const select = tr.querySelector("select");
  const codice = select.value;
  const nuovoPrezzo = Number(inputElement.value);
    
  // Se non c'è un giocatore selezionato, non fare nulla
  if (!codice) return;

  // Trova il numero squadra (es. da "containerSquadra3" => "3")
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

  // Salva l'intera pagina (opzionale, se vuoi mantenere il backup)
  salvaPagina();
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
    
      const selectedPlayer = listone.find(p => p['Cod.'] == selectElement.value);
      const tdQuotazione = selectElement.closest('tr').querySelector('.quotazione');
      const inputPrezzo = selectElement.closest('tr').querySelector('.prezzo input');
      const numDiv = selectElement.closest('div').id.replace('containerSquadra', '');

      // 🔧 Memorizza il precedente selezionato
      const prevCodice = selectElement.getAttribute('data-prev');
      const newCodice = selectElement.value;

      if (!selectedPlayer || selectedPlayer == undefined || newCodice == "0") {
        tdQuotazione.textContent = '';
        inputPrezzo.value = '';

        // 🔧 Rimuovi solo il giocatore deselezionato
        let team = JSON.parse(localStorage.getItem('squadra' + numDiv)) || [];
        team = team.filter(player => player['Cod.'] != prevCodice);
        localStorage.setItem('squadra' + numDiv, JSON.stringify(team));
        aggiornaTotale(numDiv);
        salvaPagina();
        return;
      }

      // 🔧 Salva il codice attuale per futuro controllo
      selectElement.setAttribute('data-prev', newCodice);

      tdQuotazione.textContent = selectedPlayer['Quotazione'];
      selectElement.options[selectElement.selectedIndex].textContent =
        selectElement.options[selectElement.selectedIndex].textContent.split('--')[0];

      inputPrezzo.value = selectedPlayer['prezzo'] || selectedPlayer['Quotazione'];
      selectedPlayer.prezzo = inputPrezzo.value;

      const team = [];
      let i = 0;

      Array.from(document.getElementsByClassName(`sel${numDiv}`)).forEach(sel => {
        if (newCodice == sel.value) {
          i++;
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
      salvaPagina();
    }

     function eliminaSquadra(num) {
      const container = document.getElementById('containerSquadra' + num);
      if (container) container.remove();
      localStorage.removeItem('squadra' + num);
      salvaPagina();
    }

    ////////////////////////////////////////////////////////
    