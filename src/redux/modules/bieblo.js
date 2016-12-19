const UPDATE_ILLUSTRATIONS = 'bieblo/bieblo/UPDATE_ILLUSTRATIONS'
const RESET = 'bieblo/bieblo/RESET'

// fisher-yates shuffle
const shuffle = (array) => {
  let temp = null
  for (let i = array.length - 1; i > 0; i -= 1) {
    const idx = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[idx]
    array[idx] = temp
  }
  return array
}

const initialState = {
  library: null,
  age: null,
  libraries: [
     {id: 1, naam: 'De krook', logo: 'https://pbs.twimg.com/profile_images/378800000041290325/01c214021ddc7ebc543087ce660e9fa3_400x400.png'},
  ],
  ages: [
    {id: 1, label: '7'},
    {id: 2, label: '8'},
    {id: 3, label: '9'},
    {id: 4, label: '10'},
    {id: 5, label: '11'},
  ],
  illustrations: shuffle(
    [
      {id: 1, cls: 'new', img: '/swipe/humor.jpg', label: 'Humor'},
      {id: 2, cls: 'new', img: '/swipe/fantasie.jpg', label: 'Fantasie'},
      {id: 3, cls: 'new', img: '/swipe/misterie.jpg', label: 'Misterie'},
      {id: 4, cls: 'new', img: '/swipe/sport.jpg', label: 'sport'},
      {id: 5, cls: 'new', img: '/swipe/dieren.jpg', label: 'dieren'},
      // {id: 1, cls: 'new', img: 'http://previews.123rf.com/images/lordalea/lordalea1306/lordalea130600010/20301526-Beautiful-little-ballerina-girl-cartoon-Illustration-Stock-Photo.jpg', label: 'Dansen'},
      // {id: 2, cls: 'new', img: 'http://st2.depositphotos.com/1734074/5299/v/950/depositphotos_52994261-stock-illustration-adventure-tourism-vector-flat-simple.jpg', label: 'Avontuur'},
      // {id: 3, cls: 'new', img: 'http://previews.123rf.com/images/kakigori/kakigori1309/kakigori130900044/22527618-Illustration-of-five-young-friends-together-happy-shoulder-to--Stock-Photo.jpg', label: 'Vriendschap'},
      // {id: 4, cls: 'new', img: 'https://s-media-cache-ak0.pinimg.com/originals/91/19/33/911933dc2e568995838d89f94aa14a55.jpg', label: 'Ridders'},
      // {id: 5, cls: 'new', img: 'https://kit8.net/images/thumbnails/700/525/detailed/1/Soccer_flat_vector_illustration.png?t=1454151537', label: 'Voetbal'},
      // {id: 6, cls: 'new', img: 'http://previews.123rf.com/images/shponglerrr/shponglerrr1209/shponglerrr120900001/15222876-Cartoon-illustration-of-a-little-boy-and-girl-playing-as-they--Stock-Photo.jpg', label: 'Piraten'},
      // {id: 7, cls: 'new', img: 'http://us.123rf.com/450wm/nuclearlily/nuclearlily1510/nuclearlily151000001/46809217-inzameling-van-spoken-set-van-de-iconen-voor-halloween-vector-illustratie.jpg?ver=6', label: 'Spoken'},
      // {id: 8, cls: 'new', img: 'http://previews.123rf.com/images/blueringmedia/blueringmedia1410/blueringmedia141000113/32187245-Illustration-of-a-witch-and-wizards-Stock-Photo.jpg', label: 'Heksen & Tovenaars'},
      // {id: 9, cls: 'new', img: 'https://s.s-bol.com/imgbase0/BOOKCOVER/FC/9/0/2/5/7/902573748X_8.gif', label: 'Oertijd'},
      // {id: 10, cls: 'new', img: 'https://s-media-cache-ak0.pinimg.com/originals/13/56/09/1356097d8a6c1bf082fa3b6161185f58.jpg', label: 'Verliefdheid'},
      // {id: 11, cls: 'new', img: 'http://previews.123rf.com/images/sentavio/sentavio1509/sentavio150900089/44797587-Laboratory-research-chemical-flat-style-design-vector-illustration--Stock-Photo.jpg', label: 'Wetenschap'},
    ]
  ).map(
    (item, idx) => ({
      ...item,
      order: idx,
    })
  ),
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_ILLUSTRATIONS:
      return {
        ...state,
        illustrations: action.illustrations,
      }
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const reset = () => ({ type: RESET })

const updateIllustrations = (illustrations) => ({
  type: UPDATE_ILLUSTRATIONS,
  illustrations,
})

export default reducer

export {
  reset,
  updateIllustrations,
}
