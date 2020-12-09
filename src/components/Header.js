import React from 'react'

function Header({selectedHint}) {
    return (
        <>
        <h1>Hangman</h1>
        <p>Find the hidden word-enter a letter</p>
        <p>Hint: {selectedHint}</p>
        </>
    )
}

export default Header
