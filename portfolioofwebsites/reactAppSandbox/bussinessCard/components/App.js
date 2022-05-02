import React from 'react'
import Info from './Info'
import AboutMe from './AboutMe'
import Interests from './Interests'
import Footer from './Footer'

function App(){
    return(
        <div className="Container">
            <Info />
            <AboutMe />
            <Interests />
            <Footer />
        </div>
    )
}

export default App
