import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect depuis React
import axios from "axios"; // Importation du module axios pour effectuer des requêtes HTTP

function Questions() {
    console.log("questions"); // Message de journalisation pour indiquer que le composant Questions a été rendu
    const [allQuestions, setAllQuestions] = useState([]); // Déclaration d'un état pour stocker toutes les questions
    const [answerSelected, setAnswerSelected] = useState('');
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        fetchQuestions(); // Appel de la fonction fetchQuestions lors du montage du composant (lorsque le composant est rendu pour la première fois)
    }, []);

    const fetchQuestions = async () => { // Définition d'une fonction asynchrone pour récupérer les questions depuis l'API
        const response = await axios.get("https://the-trivia-api.com/v2/questions/"); // Utilisation d'axios pour effectuer une requête GET vers l'API de questions
        setAllQuestions(response.data); // Mise à jour de l'état allQuestions avec les données des questions obtenues depuis l'API
    };

    const shuffleArray = (array) => { // Définition d'une fonction pour mélanger un tableau
        for (let i = array.length - 1; i > 0; i--) { // Parcours du tableau en partant de la fin
            const j = Math.floor(Math.random() * (i + 1)); // Génération d'un indice aléatoire entre 0 et l'indice actuel i
            [array[i], array[j]] = [array[j], array[i]]; // Échange des éléments entre l'indice actuel i et l'indice aléatoire j pour mélanger le tableau
        }
        return array; // Retourne le tableau mélangé
    };

    const correctOrNot = (answer) => {
        if (answer === answerSelected) {
            console.log("correct");
            setCount(count + 1)
            return "green"
        } else {
            console.log("incorrect");
            return "red"
        }
    };

    return (
        <>
            <div>
                {allQuestions.map((question, id) => { // Parcours de toutes les questions et affichage de chaque question dans un article
                    console.log(question.question.text); // Message de journalisation pour afficher le texte de la question
                    return (
                        <article key={id}>
                            <h3>{question.question.text}</h3> 
                            <ul>
                                {/* Mélanger les réponses correctes et incorrectes */}
                                {shuffleArray([question.correctAnswer, ...question.incorrectAnswers]).map((answer, index) => { // Mélange et affichage des réponses
                                    console.log(question.correctAnswer); // Message de journalisation pour afficher chaque réponse
                                    if (answer !== question.correctAnswer) {
                                        console.log("test");

                                    }
                                    return (
                                        <div key={index}>
                                            <input 
                                                type="radio" 
                                                id={answer} 
                                                name="radio" 
                                                value={answer} 
                                                onChange={() => setAnswerSelected(answer)}
                                            />
                                            <label 
                                                htmlFor={answer} 
                                                style={{color: answerSelected === answer ? correctOrNot(answer) : "black"}}>
                                                    {answer}
                                            </label>
                                        </div>
                                    )
                                })}
                            </ul>
                            <button type="submit" onClick={() => console.log(`Total des points: ${count}`)} >
                                Valider
                            </button>
                        </article>
                    )
                })}
            </div>
        </>
    )
}

export default Questions; // Exportation du composant Questions pour pouvoir l'utiliser dans d'autres composants
