import './App.css';
import React, { useEffect, useState } from 'react';
import { modules } from './db';
import { qcms } from './qcms';
function App() {
  const [selectedOption, setSelectedOption] = useState("default");
  const [qcmslist, setqcmslist] = useState([])
  const [year, setyear] = useState(0)
// Sample data
useEffect(()=>{
  if(!selectedOption || selectedOption == "default"){
    return
  }
  let creatingdisplayedqcmlist = qcms.filter((qcm)=>(qcm.mtitle==selectedOption && qcm.annee == 2022))

  setqcmslist(creatingdisplayedqcmlist)

},[selectedOption])
const data = [
  {
    "mtitle": "PÉDIATRIE ",
    "ctitle": "ICTÈRE DU NOUVEAU-NÉ",
    "stitle": "EXTERNAT",
    "qcm_question": "Parmi les propositions suivants, indiquez la ou les propositions correctes :",
    "qcm_choices": [
      "l’ictère physiologique du nouveau-né est un ictère à bilirubine conjuguée ",
      "l’ictère par incompatibilité fœto-maternelle Rh apparaît après plus de 24 heures de vie ",
      "la photothérapie par la lumière bleue active les processus enzymatiques de la glycuro-conjugaison",
      "l’administration de gardénal en cas de bilirubine élevée chez le nouveau-né à pour but de protéger d’éventuelles convulsions ",
      "aucune des propositions précédentes n’est exacte "
    ],
    "qcm_responses": [
      0,
      0,
      0,
      0,
      1
    ],
    "annee": 2018
  }
];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>base des données QCM setif Prototype</h1>
      <label htmlFor="data-select">Select Item:</label>
      <select id="data-select" value={selectedOption} onChange={handleChange}>
      <option key="default" value="default" disabled >select</option>
      {
        modules?.length? modules.map((module,index)=>( 
        
          <option key={module?.key} value={module.key}>
            {module?.key}
          </option>
)) : ""
      }</select>

<div className='listq'>
{qcmslist?.length && selectedOption ?
        qcmslist.map((currentData,index)=>(<div className='ex'  style={{ marginTop: '20px' }}>
        <h2>{currentData.mtitle}</h2>
        <h3>{currentData.ctitle}</h3>
        <h4>{currentData.stitle}</h4>
        <p><strong>{currentData.qcm_question}</strong></p>
        <ul>
          {currentData.qcm_choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
        <p><strong>Correct Answers:</strong></p>
        <ul>
          {currentData.qcm_choices.map((choice, index) => (
            <li key={index}>
              {choice} - {currentData.qcm_responses[index] ? 'Correct' : 'Incorrect'}
            </li>
          ))}
        </ul>
        <p><strong>Year:</strong> {currentData.annee}</p>
      </div>))
       : "select an option"} </div>

    </div>
  );
}

export default App;