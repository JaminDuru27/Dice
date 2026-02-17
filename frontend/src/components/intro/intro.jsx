export function Intro() {
    const texts = [
        'Roll the dice and let fate decide!',
        'Feeling lucky? Give it a roll!',
        'Every roll is a new adventure!',
        'Let the dice do the talking!',
        'Unleash the power of the dice!',
    ]
    const randomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min// Example usage: Generate a random number between 1 and 6
    return (
    <div 
    style={{backgroundImage: `url(/bg2.jpg), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`}}
    className="intro bg-cover bg-center absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div 
        style={{backgroundImage: `linear-gradient(45deg, #80008057, #0000ff52, #5bff5b7a)`}}
        className="w-full  h-full absolute top-0 left-0 backdrop-blur-sm flex flex-col    items-center justify-center intro-content">
            {/* <img src="/bg1.jpg" alt="Dice" className="dice-image" /> */}
            <div className=""></div>
            <h1 className="intro-title">Dice</h1>
            <div className="text">
                {texts[randomNumber(texts.length - 1, 0)]}
            </div>
        </div>
        
    </div>
  )
}