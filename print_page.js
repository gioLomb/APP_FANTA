function aggiungiSquadra() {
      [numPor, numDif, numCC, numAtt] = checkNumeriRuoli();

      const contenitore = document.getElementById("contenitoreSquadre");
      const ultimoNumero = Array.from(contenitore.children)
        .map(div => parseInt(div.id.replace('containerSquadra', '')))
        .filter(n => !isNaN(n))
        .reduce((max, n) => Math.max(max, n), 0);

      const nuovoNumero = ultimoNumero + 1;
      const nuovaDiv = document.createElement("div");
nuovaDiv.id = `containerSquadra${nuovoNumero}`;
nuovaDiv.classList.add('card-squadra');

      const prospetto = 
        printRowsFromRole("PORTIERI", numPor, roles.find(r => r.startsWith("P")), nuovoNumero) +
        printRowsFromRole("DIFENSORI", numDif, roles.find(r => r.startsWith("D")), nuovoNumero) +
        printRowsFromRole("CENTROCAMPISTI", numCC, roles.find(r => r.startsWith("C")), nuovoNumero) +
        printRowsFromRole("ATTACCANTI", numAtt, roles.find(r => r.startsWith("A")), nuovoNumero) +
        `<H1>TOTALE SQUADRA:</H1><H2 id='totale_${nuovoNumero}'>0</H2>`+
        `<button onclick='eliminaSquadra(${nuovoNumero})'>Elimina</button>`;

      nuovaDiv.innerHTML = prospetto;
      contenitore.appendChild(nuovaDiv);
      localStorage.setItem('squadra' + nuovoNumero, JSON.stringify([]));
      salvaPagina();
    }

   

    function printRowsFromRole(textRole, numRuolo, codeRole, numTeam) {
      let selects = "";
      let options = "";

      listone.sort((a, b) => b.Quotazione - a.Quotazione);
      listone.forEach(player => {
        if (player['Ruolo'] == codeRole) {
          options += `<option value='${player['Cod.']}'>${player['Giocatore']}--${player['Quotazione']}</option>`;
        }
      });

      for (let i = 0; i < numRuolo; i++) {
        selects += `<tr><td>
            <select class='sel${numTeam}' onchange='AggiornaQuotazione(this)'>
              <option value='0'>SCEGLI</option>
              ${options}
            </select></td>
            <td class='quotazione'></td>
            <td class='prezzo'><input type='number' onchange='aggiornaPrezzoGiocatore(this)'></td>
          </tr>`;
      }

      return `<h2>${textRole}</h2>
        <table>
          <tr><th>Giocatore</th><th>Quotazione</th><th>Prezzo</th></tr>
          ${selects}
        </table><h1>totale :</h1><h2 id='totale_${codeRole}_${Number(numTeam)}'>0</h2>`;
    }
    