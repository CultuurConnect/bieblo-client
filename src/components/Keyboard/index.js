import React from 'react'

import {renderCharacterKey, renderRemoveCharacterKey} from './character'

const DEFAULT_CHARACTERS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
]

const Keyboard = ({characters, value, onUpdateValue, animated}) => {
  return (
    <div className="keyboard">
      <div className="row">
        <div className="col-md-11">
          {characters.map(character => renderCharacterKey(character, value, onUpdateValue, animated))}
        </div>
        <div className="col-md-1">
          {renderRemoveCharacterKey(value, onUpdateValue, animated)}
        </div>
      </div>
    </div>
  )
}

export default Keyboard

export {
  DEFAULT_CHARACTERS,
}
