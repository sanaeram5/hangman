import React,{useState,useEffect} from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import {showNotification as show} from './helpers/helpers';
import Popup from './components/Popup';
import Notification from './components/Notification';

const words = ['application', 'programming', 'interface', 'wizard'];
const hint =['implementation','c/c++','interlinking','magical powers in legends'];

let ran= Math.floor(Math.random() * words.length);
let selectedWord = words[ran];
let selectedHint = hint[ran];

function App() {
	const [playable, setPlayable]=useState(true);
	const [correctLetters,setCorrectLetters]=useState([]);
	const [wrongLetters,setWrongLetters]=useState([]);
	const [showNotification,setShowNotification]=useState(false);

	useEffect(()=>{
		const handleKeyDown=event=>{
			const{key,keyCode}=event;
				if (playable && keyCode >= 65 && keyCode <= 90) {
					const letter = key.toLowerCase();
		
					if (selectedWord.includes(letter)) {
						if (!correctLetters.includes(letter)) {
							setCorrectLetters(currentLetters=>[...currentLetters,letter]);
						} else {
							show(setShowNotification);
						}
					} else {
						if (!wrongLetters.includes(letter)) {
							setWrongLetters(wrongLetters=>[...wrongLetters,letter]);
						} else {
							show(setShowNotification);
						}
					}
				}
			}
		window.addEventListener('keydown', handleKeyDown);
		return()=>window.removeEventListener('keydown',handleKeyDown);
	},[correctLetters,wrongLetters,playable]);

	function playAgain(){
		setPlayable(true);
		setCorrectLetters([]);
		setWrongLetters([]);
		const random = Math.floor(Math.random() * words.length);
		selectedWord=words[random];
		selectedHint=hint[random];
	}

	return(
	<>
		<Header selectedHint={selectedHint} />
		<div className="game-container">
			<Figure wrongLetters={wrongLetters} />
			<WrongLetters wrongLetters={wrongLetters} />
			<Word selectedWord={selectedWord} correctLetters={correctLetters} />
		</div>
		<Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
		<Notification showNotification={showNotification} />
	</>
	);
};

export default App;