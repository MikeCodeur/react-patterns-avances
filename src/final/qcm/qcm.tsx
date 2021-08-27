// DO NOT EDIT THIS FILE !!!
import React from 'react'

interface IQuestion {
  question: string
  options:string[]
  answer: string
}

interface IQCMInterface {
  exerciseId: string
  exerciseTitle : string
  quiz: IQuestion[]
}

const QCM: Array<IQCMInterface> = [
  {
    exerciseId: 'src/exercise/01.md',
    exerciseTitle: 'Composants Composés',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/02.md',
    exerciseTitle: 'Composants composés avec Contexte',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/03.md',
    exerciseTitle: 'Collection de props',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/04.md',
    exerciseTitle: 'State Reducer',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/05.md',
    exerciseTitle: 'Props Control',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
  {
    exerciseId: 'src/exercise/06.md',
    exerciseTitle: 'Context Module Functions',
    quiz: [
      {
        question: "Valide simplement cet exercice en cliquant sur validé",
        options: ["Validé", "Non validé"],
        answer: "0"
      }
    ],
  },
]

//export default QCM;

const QcmComponent = () => {
  return (<>{ JSON.stringify(QCM, null, 2) }</>);
}
export default QcmComponent
