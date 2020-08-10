import { createStore } from 'redux';

const $form = document.getElementById('form');
$form.addEventListener('submit', handleSubmit);

const $deleteBtn = document.getElementById('delete-btn');
$deleteBtn.addEventListener('click', deleteLastElement);


function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData($form);
  const title = data.get('title');
  store.dispatch({
    type: 'ADD_SONG',
    payload: { title }
  })
  event.target[0].value = '';
}

function deleteLastElement(event) {
  store.dispatch({
    type: 'DELETE_LAST_SONG'
  })
}

const initialState = [
  {
    "title": "Despacito",
  },
  {
    "title": "One more time",
  },
  {
    "title": "Echame la culpa",
  }
]

const reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload]

    case 'DELETE_LAST_SONG':
      let playlist = [...state]
      playlist.pop()
      return playlist

    default:
      return state
  }
}


const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)


function render() {
  const $container = document.getElementById('playlist');
  const playlist = store.getState();
  $container.innerHTML = '';

  playlist.forEach(item => {
    const listElement = document.createElement('p');
    listElement.onclick = () => { console.log('hola'); };
    listElement.textContent = item.title;
    $container.appendChild(listElement);
  });
}
render();

function handleChange() {
  render();
}

store.subscribe(handleChange)

// console.log(store.getState());