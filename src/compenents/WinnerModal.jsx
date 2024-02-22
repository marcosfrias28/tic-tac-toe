import { Square } from "./Square"

export function WinnerModal({winner, resetGame}) {
    if (winner === null) return
    
    return (
            <section className="winner"> 
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? "It's a tie!"
                    : `Winner!`
                  }
                </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Restart game</button>
              </footer>
              </div>
            </section>
          )
        
}