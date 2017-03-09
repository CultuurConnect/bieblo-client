const SET_THEMES = 'bieblo/bieblo/SET_THEMES'
const SET_SWIPING = 'bieblo/bieblo/SET_SWIPiNG'
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
  swiping: false,
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
  themes: shuffle(
    [
      {id: 1, cls: 'new', img: '/swipe/Humor.jpg', label: 'Humor'},
      {id: 2, cls: 'new', img: '/swipe/Magie.jpg', label: 'Magie'},
      {id: 3, cls: 'new', img: '/swipe/Detective.jpg', label: 'Detective'},
      {id: 4, cls: 'new', img: '/swipe/Sport.jpg', label: 'Sport'},
      {id: 5, cls: 'new', img: '/swipe/Dieren.jpg', label: 'Dieren'},
      {id: 6, cls: 'new', img: '/swipe/AndereCulturen.jpg', label: 'Andere Culturen'},
      {id: 7, cls: 'new', img: '/swipe/Liefde.jpg', label: 'Liefde'},
      {id: 8, cls: 'new', img: '/swipe/OorlogHistorisch.jpg', label: 'Oorlog Historisch'},
      {id: 9, cls: 'new', img: '/swipe/Prijsboeken.jpg', label: 'Prijsboeken'},
      {id: 10, cls: 'new', img: '/swipe/Vriendschap.jpg', label: 'Vriendschap'},
    ]
  ).map(
    (item, idx) => ({
      ...item,
      order: idx,
    })
  ),
  themesLiked: [],
  themesDisliked: [],
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_THEMES:
      return {
        ...state,
        themes: action.themes,
        themesLiked: action.themesLiked,
        themesDisliked: action.themesDisliked,
        swiping: false,
      }
    case SET_SWIPING:
      return {
        ...state,
        swiping: action.swiping,
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

const setThemes = (themes, themesLiked, themesDisliked) => ({
  type: SET_THEMES,
  themes,
  themesLiked,
  themesDisliked,
})

const setSwiping = (swiping) => ({
  type: SET_SWIPING,
  swiping,
})

export default reducer

export {
  reset,
  setThemes,
  setSwiping,
}
