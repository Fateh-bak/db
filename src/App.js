import './App.css';
import React, { useEffect, useState } from 'react';
import { modules } from './db';
import { qcms } from './qcms';
function App() {
  const [selectedOption, setSelectedOption] = useState("default");
  const [qcmslist, setqcmslist] = useState([])
  const [year, setyear] = useState("0")
  const [qcmnum,setqcmnum] = useState(0)
// Sample data
useEffect(()=>{
  if(!selectedOption || selectedOption == "default"){
    return
  }

  let creatingdisplayedqcmlist = qcms.filter((qcm)=>(qcm.mtitle==selectedOption))
  if(year!=="0"){
    creatingdisplayedqcmlist = creatingdisplayedqcmlist.filter((qcm)=>(parseInt(qcm.annee)===parseInt(year)))
  }
  setqcmnum(creatingdisplayedqcmlist.length)
  setqcmslist(creatingdisplayedqcmlist)

},[selectedOption,year])
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

  const handleChange = (event,type) => {
    if(type==="year"){
      setyear(event.target.value)
      return
    }
    setSelectedOption(event.target.value);
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>base des données QCM setif Prototype</h1>
      <label htmlFor="data-select">Module:</label>
      <select id="data-select" value={selectedOption} onChange={handleChange}>
      <option key="default" value="default" disabled >select</option>
      {
        modules?.length? modules.map((module,index)=>( 
        
          <option key={module?.key} value={module.key}>
            {module?.key}
          </option>
)) : ""
      }</select>
      
      <label htmlFor="data-select">année:</label>
      <select id="data-select" value={year} onChange={(e)=>{handleChange(e,"year")}}>
      <option key="default" value="0" disabled >select</option>
      <option key="2023" value="2023"  >2023</option>
      <option key="2022" value="2022"  >2022</option>
      <option key="2021" value="2021"  >2021</option>
      <option key="2020" value="2020"  >2020</option>
      <option key="2019" value="2019"  >2019</option>
      <option key="2018" value="2018"  >2018</option>
      <option key="2017" value="2017"  >2017</option>
      <option key="2016" value="2016"  >2016</option>
      <option key="2015" value="2015"  >2015</option>
      <option key="2014" value="2014"  >2014</option>
      <option key="2013" value="2013"  >2013</option>
      <option key="2012" value="2012"  >2012</option>
      <option key="2011" value="2011"  >2011</option>
      <option key="2010" value="2010"  >2010</option>


      </select>
<div className='listq'>
<div> 
<h2>Nombre des qcm <span>{qcmnum}</span></h2>

</div>
{qcmslist?.length && selectedOption ?
        qcmslist.map((currentData,index)=>(<div className='ex'  style={{ marginTop: '20px' }}>
        <h2>{currentData.mtitle}</h2>
        <h3>{currentData.ctitle}</h3>
        <h4>{currentData.stitle}</h4>
        <p><strong>{currentData.qcm_question}</strong></p>
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