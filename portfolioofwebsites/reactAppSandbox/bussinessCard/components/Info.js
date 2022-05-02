import React from 'react'

function Info(){
    return(
      <>
        <img src="https://media-exp1.licdn.com/dms/image/C5603AQEN4YsA2QcKrA/profile-displayphoto-shrink_200_200/0/1517555144118?e=1657152000&v=beta&t=IJGk-Tu0XjINTVdQEtbe6_UkrXN48Txm9njwiDXqQMM" width="317px"/>
        
        <p className="Name">Jonathan Barnes</p>
        <p className="Job">Frontend Developer</p>
        <p className="WebsiteLink">Website Link</p>
        
        <div ClassName="ButtonsContainer">
            <button className="EmailButton">Email</button>
            <button className="LinkdinButton">Linkdin</button>
        </div>
      </>
    )
}

export default Info
