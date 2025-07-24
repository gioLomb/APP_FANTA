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
          
    if(!(/^[PDCA]/.test(role))) return;// in caso ci siano ruoli diversi
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
function checkSelection(p1,p2){
  if(p1 && p2['Cod.']==p1['Cod.']){
    return "selected"
  }
  return "";
}