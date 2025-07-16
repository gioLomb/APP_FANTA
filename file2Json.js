function csv2json(csvAsText){
    let lines = csvAsText.split('\r\n').filter(line => line.trim() !== '');//ottengo tutti i record,eliminando i vuoti

    const headers = getHeaders(lines); // rimuove e ottiene intestazione
    let listone = [];
    //COSTRUZIONE JSON LISTONE
    for (let line of lines) {
        const data = line.split(';');
        if (data.length !== headers.length) continue; // evita righe incomplete

        let player = {};
        for (let i = 0; i < headers.length; i++) {
            player[headers[i]] = data[i];
        }
        player['prezzo']=null
        player['fascia']=null
        listone.push(player);
    }

    return listone;
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
    return obj;
  });

  return listone;
}




function xlsToJson(file){
    const data = new Uint8Array(file);
    const workbook = XLSX.read(data, { type: 'array' });

    // Prende il primo foglio
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Converte in JSON usando la prima riga come intestazioni
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Separiamo intestazioni e righe
    const headers = json[0];
const rows = json.slice(1).filter(row => row.some(cell => cell != null && cell.toString().trim() !== ''));
    
    // Genera oggetti JSON
    const finalJson = rows.map(row => {
      let obj = {};
      headers.forEach((key, i) => {
        
        obj[key] = row[i] ?? ''; // Se mancano valori, metti stringa vuota
        
      });
       obj['prezzo']=null
         obj['fascia']=null
      return obj;
    });

    return finalJson;
}

function getHeaders(allLines){
let header=allLines.slice(0,1)
allLines.splice(0,1);
//console.log(header)
return header[0].split(';')
}
console.log(1)