function checkNumeriRuoli() {
      if (localStorage.getItem('numeriRuoli') == null) {
        const valori = [3, 7, 8, 6];
        localStorage.setItem('numeriRuoli', valori);
        return valori;
      } else {
        return localStorage.getItem('numeriRuoli').split(',').map(Number);
      }
    }

    function richiediRuoli() {
      const nuovi = [
        prompt("Inserisci numero portieri"),
        prompt("Inserisci numero difensori"),
        prompt("Inserisci numero centrocampisti"),
        prompt("Inserisci numero attaccanti")
      ];
      localStorage.setItem('numeriRuoli', nuovi);
    }
    //UPDATE
    function printTotals(numDiv,totPor,totDif,totCc,totAtt,totale){
         roles.forEach(role=>{
    if(role.startsWith('M')) return;// costretto
    console.log(`totale_${role}_${numDiv}`)
    document.getElementById(`totale_${role}_${numDiv}`).innerHTML= role.startsWith('P') ? totPor :  role.startsWith('D') ? totDif :  role.startsWith('C') ? totCc :totAtt

  })
  
  document.getElementById(`totale_${numDiv}`).innerHTML=totale
    }


    function increaseTot(totPor,totDif,totCc,totAtt,ruolo,prezzo){
        if (ruolo.startsWith('P')) totPor += prezzo;
    else if (ruolo.startsWith('D')) totDif += prezzo;
    else if (ruolo.startsWith('C')) totCc += prezzo;
    else if (ruolo.startsWith('A')) totAtt += prezzo;
    return [totPor,totDif,totCc,totAtt]
    }
    function getTeamUpdatingUnselectedPlayer(tdQuotazione,inputPrezzo,numDiv){
        tdQuotazione.textContent = '';
        inputPrezzo.value=''
        const team = [];

Array.from(document.getElementsByClassName(`sel${numDiv}`)).forEach(sel => {
          if (sel.value) {
            const player = listone.find(p => p['Cod.'] == sel.value);
            if (player) team.push(player);
          }
        });
        return team;
    }
    function getTeamUpdatingSelectedPlayer(selectedPlayer,tdQuotazione,selectElement,inputPrezzo,numDiv){
    const team = [];
        let i=0;
        tdQuotazione.textContent = selectedPlayer['Quotazione'];
        selectElement.options[selectElement.selectedIndex].textContent =
          selectElement.options[selectElement.selectedIndex].textContent.split('--')[0];
        inputPrezzo.value = selectedPlayer['prezzo'] || selectedPlayer['Quotazione'];
        selectedPlayer.prezzo=inputPrezzo.value
       
       
console.log('selected',selectElement)
Array.from(document.getElementsByClassName(`sel${numDiv}`)).forEach(sel => {
  if(selectElement.value==sel.value){
    i++
     if(i==2){
      tdQuotazione.textContent = '';
        inputPrezzo.value=''
      alert('ATTENTO E\' GIA\' INSERITO')
      selectElement.selectedIndex=0 //azzera rimettendo SCEGLI
     }
  }
  if (sel.value && i!==2) {
    const player = listone.find(p => p['Cod.'] == sel.value);
    if (player) {
      const prezzoInput = sel.closest('tr').querySelector('input');
      const prezzo = prezzoInput.value || player['Quotazione']; // fallback alla quotazione
      team.push({ ...player, prezzo: prezzo });
    }
  }
});
return team;
    }