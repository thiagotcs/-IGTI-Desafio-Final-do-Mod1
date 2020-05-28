/**
 * Estado da aplicação (state)
 */
let inputName = null;
let tabPeople = null;
let tabFavorites = null;
let allPeople = [];
let favoritePeople = [];
let countPeople = 0;
let countFavorites = 0;
let totalPeople = 0;
let totalPeopleFavorites = 0;
let numberFormat = null;
let button = null;
let imgFavorites = null;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');
  tabPeople = document.querySelector('#tabPeople');
  tabFavorites = document.querySelector('#tabFavorites');
  countPeople = document.querySelector('#countPeople');
  countFavorites = document.querySelector('#countFavorites');
  totalPeople = document.querySelector('#totalPeople');
  totalPeopleFavorites = document.querySelector('#totalPeopleFavorites');
  numberFormat = Intl.NumberFormat('pt-BR');
  button = document.querySelector('#button');
  imgFavorites = document.querySelector('#imgFavorites');

  fetchPeople();
});

async function fetchPeople() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  allPeople = json.results.map(person => {

    const {
      name: {
        first,
        last
      },
      dob: {
        age
      },
      picture: {
        large
      },
      gender
    } = person;
    return {
      first,
      last,
      large,
      age,
      gender,

    };
  });
  // console.log(allPeople);
  render();
}

function render() {
  renderActivateInpu();
  renderFavorites();
  handlePeopleButtons();
}

function renderActivateInpu() {
  function handleTyping(event) {
    if (event.type != "click") {

      if (event.target.value) {
        button.classList.remove("disabled");
      } else {
        button.classList.add("disabled");;
      }
    }
    //console.log(event);
    if (event.keyCode == 13 || event.type == "click") {
      const typedName = document.getElementById("inputName").value;
      const inputPeople = allPeople.filter(person => person.first.includes(typedName));

      renderCountPeople(inputPeople);
      renderSummary(inputPeople);

      countFavorites.innerHTML = '<i class="Medium material-icons">pie_chart</i> Estatísticas';
      imgFavorites.innerHTML = `<div><img src="img/igti.png" alt="IGTI" class="imgIGTI"></div>`
      countPeople.innerHTML = `<i class="Medium material-icons">group</i> ${inputPeople.length} USUÁRIO(S) encontrado(s)`;

      function renderSummary(param = allPeople) {

        const totalMa = param.filter(person => person.gender === 'male').length;
        mFavorites.textContent = `Sexo Masculino: ${totalMa}`;

        const totalfe = param.filter(person => person.gender === 'female').length;
        fFavorites.textContent = `Sexo Feminino: ${totalfe}`;

        const somaIdade = param.reduce((accumulator, current) => accumulator + current.age, 0);
        somaFavorites.textContent = `Soma das Idades:${formatNumber(somaIdade)}`;

        const MedIdade = somaIdade / param.length;
        mediaFavorites.textContent = `Média das Idades: ${formatNumber(MedIdade)}`;
      };
    };
  };

  function preventClick(event) {
    event.preventDefault();
    handleTyping(event);
    console.log('teste');

  }
  button.addEventListener('click', preventClick);
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
};

function renderCountPeople(teste) {
  let peoplesHTML = '<div>';
  teste.forEach(people => {
    const {
      first,
      last,
      large,
      age
    } = people;

    const peopleHTML = `
    <div class='divPerson'>
    <div>
       <img src="${large}" alt="${first}">
    </div>  
    <div>
      <span>${first} ${last}, ${age} anos </span>
    </div>
    </div>
    `;
    peoplesHTML += peopleHTML;
  });

  peoplesHTML += '</div>';
  tabPeople.innerHTML = peoplesHTML;

  // console.log(tabPeople);
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoritePeople.forEach(peopleFavorite => {
    const {
      first,
      last,
      large,
      age
    } = peopleFavorite;

    const favoritePeopleHTML = `
     <div class='divPerson'>
     <div>
        <img src="${large}" alt="${first}">
     </div>  
     <div>
       <span>${first} ${last}, ${age} anos </span>
     </div>
        
     </div>
     `;
    favoritesHTML += favoritePeopleHTML;
  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;

}

function formatNumber(number) {
  return numberFormat.format(number);
}