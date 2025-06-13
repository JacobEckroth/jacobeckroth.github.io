import "./App.css";
import PixelArtHolder from "./components/PixelArtHolder";

function App() {
  return (
    <div className="App">
      <h1>Jacob Eckroth</h1>
      <p>
        What's up? Glad you made it here alright, I hope all is well with you.
        Things are going ok over here, just working on figuring out the whole
        life thing. At some point this website may be formatted nicer, but for
        now this is what you're going to get. Alright. Enough with the boredom.
        Here's some stuff I've been working on. It's not good, but I hope it
        will be someday. It'll mostly be pixel art on this website but I'm also working on music
        and some simple games in the time being. The goal is to pull off a Concerned Ape somehow
        but alas time and money withold me.
      </p>
      <PixelArtHolder/>
    </div>
  );
}

export default App;
