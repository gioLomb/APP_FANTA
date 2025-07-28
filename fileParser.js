let ext
document.getElementById('file').addEventListener('change',function(event){ //ALL'INSERIMENTO DI FILE.....
    const file=event.target.files[0];
    ext=file.name.split('.').pop().toLowerCase()
    const reader=new FileReader()
    reader.onload=function(e){
        const fileAsText=e.target.result
        console.log(file.name)
        let listoneCandidato=file2Json(fileAsText,ext)
        checkLocalStorage(listoneCandidato)
        location.reload()
}


    ext=='csv' ? reader.readAsText(file) : reader.readAsArrayBuffer(file)
})


// document.getElementById('excelFile').addEventListener('change', function(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function(e) {
//     let listoneCandidato=file2Json(e.target.result,'.')
//     checkLocalStorage(listoneCandidato)
//     location.reload()

//   };

//   reader.readAsArrayBuffer(file);
// });

function checkLocalStorage(listoneCandidato) {
  let storedRaw = localStorage.getItem('listone');
  if (!storedRaw) {
    localStorage.setItem('listone', JSON.stringify(listoneCandidato));
    return;
  }

  const storedParsed = JSON.parse(storedRaw);
  const headers = Object.keys(storedParsed[0]);
  

  const storedMap = new Map(
    storedParsed.map(player => [String(player[headers[0]]), player]) //map per ricerca istantanea in base al codice
  );

  const codsListoneCandidato = listoneCandidato.map(item => String(item[headers[0]])).sort((a,b)=>a<b);
  const codsStored = storedParsed.map(item => String(item[headers[0]])).sort((a,b)=>a<b);

  if (codsListoneCandidato.toString() === codsStored.toString()) {
    alert('uguale');
    return;
  }

  let msg = 'IL LISTONE È CAMBIATO:\n';

  for (let i = 0; i < listoneCandidato.length; i++) {
    const candidato = listoneCandidato[i];
    const codice = String(candidato[headers[0]]); //stringa per gestione csv e excel diversa

    delete candidato.prezzo;
    delete candidato.fascia;
    delete candidato.Obiettivo;
    const existing = storedMap.get(codice); //controlla se al codice del candidato corrisponde un record nel listone stored come map

    if (!existing) {
      candidato.prezzo = null;
      candidato.fascia = null;
      candidato.Obiettivo = '';

      msg += candidato.Giocatore + '\n';
    } else {
      candidato.prezzo = existing.prezzo;
      candidato.fascia = existing.fascia;
      candidato.Obiettivo = existing.Obiettivo;
    }
  }

  alert(msg);
  localStorage.setItem('listone', JSON.stringify(listoneCandidato));
}


function file2Json(content, ext) {
  let headers = [];
  let rows = [];

  if (ext === 'csv') {
    const lines = content.split('\r\n').filter(line => line.trim() !== '');
    headers = lines.shift().split(';');
    rows = lines.map(line => line.split(';'));

  } else{
    const data = new Uint8Array(content);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheet];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    headers = json[0];
    rows = json.slice(1).filter(row => row.some(cell => cell != null && cell.toString().trim() !== ''));
  }

  const listone = rows.map(row => {
    const obj = {};
    headers.forEach((key, i) => {
      obj[key] = row[i] ?? '';
    });
    obj.prezzo = null;
    obj.fascia = null;
    obj.Obiettivo=''
    return obj;
  });

  return listone;
}
