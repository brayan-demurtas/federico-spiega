const fetchInsultButton = document.getElementById("fetchInsult");
const userNameInput = document.getElementById("input");
const insultResultElement = document.getElementById("insultResult");
const deleteInsultButton = document.getElementById("deleteInsult");
const btnGayMode = document.getElementById("gaymode");
const secretContainer = document.getElementById("secret");
const title = document.querySelector("h1");
const childrenSecretContainer = [...secretContainer.children]

fetchInsultButton.addEventListener("click", renderInsult);
deleteInsultButton.addEventListener("click", deleteAllInsult);
btnGayMode.addEventListener("change", () => {
  if (btnGayMode.checked) {
    titlecolor = setInterval(() => {
      title.style.color = `${randomColor()}`;
     
      childrenSecretContainer.forEach((child)=>{
child.style.backgroundColor = randomColor()
      })

      

    }, 900);
  } else {
    clearInterval(titlecolor);
    title.style.color = "";
    childrenSecretContainer.forEach((child)=>{
      child.style.backgroundColor = ''})
  }
});

// Funzione per gestire il fetching dei dati
async function fetchData() {
  try {
    // Effettua la richiesta fetch al server proxy locale
    const response = await fetch("http://localhost:3000/proxy", {
      method: "GET",
      mode: "cors",
    });

    // Verifica se la risposta è stata ricevuta correttamente
    if (!response.ok) {
      throw new Error("Errore nella richiesta: " + response.statusText);
    }

    // Estrai i dati JSON dalla risposta
    const data = await response.json();

    return data;
  } catch (error) {
    // Gestione minima, perché non ho volgia degli errori nel caso la richiesta fallisca
    console.error("Si è verificato un errore:", error);
  }
}
function createItemList(insult, userName) {
  let item = document.createElement("li");

  item.classList.add(
    "list-disc",
    "font-semibold",
    "bg-[#f8fafc]",
    "rounded-lg",
    "p-4"
  );
  if (btnGayMode.checked) {
    item.classList.add("animate-spin");
    item.style.backgroundColor = randomColor();
    setTimeout(() => {
      //avrei semplicemente potuto creare un animazione che facesse un solo giro, ma non avevo voglia
      item.classList.remove("animate-spin");
    }, 500);
  }

  item.innerHTML = `${userName}, ${insult}`;

  insultResultElement.appendChild(item);
  return item;
}

async function renderInsult() {
  const data = await fetchData();
  const insult = data.insult.toLowerCase();
  let userName = userNameInput.value;
  if (!checkInput(userName)) {
    createItemList(insult, userName);
  }
  return;
}

function deleteAllInsult() {
  insultResultElement.innerHTML = "";
}

function checkInput(userName) {
  const regex = /^[0-9]+$/;
  const control = regex.test(userName);
  if (control) {
    alert("Ti prego non farmi incazzare e metti un nome valido");
    return true;
  } else if (userName == "") {
    alert("così impari");
    alert("stronzo");
    userNameInput.value = "Tua mamma";

    return true;
  } else if (userName === "Brayan") {
    const secretSeen = localStorage.getItem("visto");
    if (!secretSeen === true) {
      insultResultElement.innerHTML = "";
      alert("Ti faccio i miei complimenti per la scelta del nome");
      alert("per ringraziarti ti farò avere del contenuto speciale");
      revealTheSecret();
      localStorage.setItem("visto", true);
    
      return true;
    } else {
      return false;
    }
  }
  return false;
}

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red},${green},${blue})`;
  return color;
}

function revealTheSecret() {
  const img = document.createElement("img");
  const reveal = document.createElement("input");
  const imgDescription = document.createElement(`span`);
  const div = document.createElement(`div`);

  secretContainer.classList.remove("hidden");

  img.classList.add("size-96");

  img.setAttribute("src", "./img/Er-Demux.jpg");

  reveal.setAttribute("type", "range");
  reveal.setAttribute("min", "0");
  reveal.setAttribute("max", "2");
  reveal.value = 0;

  imgDescription.classList.add(
    "absolute",
    "top-3",
    "right-3",
    "z-50",
    "text-base-900",
    `font-semibold`,
    'bg-gray-100',
    'rounded-lg',
    'p-2'
  );
  imgDescription.innerText = "Prima";

  div.classList.add("relative");

 
  div.appendChild(img);
  div.appendChild(reveal);
  secretContainer.appendChild(div);
  div.appendChild(imgDescription);

  reveal.addEventListener(`input`, () => {
    changeImgWithRange(reveal, img, imgDescription);
  });
}

function changeImgWithRange(reveal, img, imgDescription) {
  if (reveal.value > 1) {
    img.setAttribute("src", "./img/Er-Demux-Prime.jpg");
    imgDescription.innerText = "Dopo";
  } else {
    img.setAttribute("src", "./img/Er-Demux.jpg");
    imgDescription.innerText = "Prima";
  }
}


