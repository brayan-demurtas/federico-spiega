
const fetchInsultButton = document.getElementById('fetchInsult');
const userNameInput = document.getElementById('input');
const insultResultElement = document.getElementById('insultResult');
const deleteInsultButton = document.getElementById('deleteInsult');



fetchInsultButton.addEventListener('click', renderInsult);
deleteInsultButton.addEventListener('click', deleteAllInsult);

// Funzione per gestire il fetching dei dati
async function fetchData() {
  try {
    // Effettua la richiesta fetch al server proxy locale
    const response = await fetch('http://localhost:3000/proxy', {
      method: 'GET',
      mode: 'cors',
    });

    // Verifica se la risposta è stata ricevuta correttamente
    if (!response.ok) {
      throw new Error('Errore nella richiesta: ' + response.statusText);
    }

    // Estrai i dati JSON dalla risposta
    const data = await response.json();

  
   return data
  } catch (error) {
    // Gestione minima, perché non ho volgia degli errori nel caso la richiesta fallisca
    console.error('Si è verificato un errore:', error);
  }
}
function createItemList(insult, userName){
 let item = document.createElement('li')
item.classList.add('list-disc')
item.classList.add('font-semibold')
item.classList.add('bg-[#f8fafc]')
item.classList.add('rounded-lg')
item.classList.add('p-4')

item.innerHTML= `${userName}, ${insult}`

  insultResultElement.appendChild(item)
}

async function renderInsult(){
  const data = await fetchData()
const insult = data.insult.toLowerCase()
 let userName = userNameInput.value
 if(!checkInput(userName)){
   createItemList(insult, userName)

 }return
 


 
}

function deleteAllInsult(){
  insultResultElement.innerHTML= ''
}
 
function checkInput(userName) {
  const regex = /^[0-9]+$/;
  const control = regex.test(userName);
  if (control) {
    alert('Ti prego non farmi incazzare e metti un nome valido');
    return true; 
  }else if(userName == ''){
    alert('così impari')
    alert('stronzo')
    userNameInput.value = 'Tua mamma'
   
    return true
  }
  return false; 
}
