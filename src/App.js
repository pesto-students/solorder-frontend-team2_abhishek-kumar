// import logo from './logo.svg';
// import './App.css';

function App() {
  const throwError = () =>{
    throw new Error("Sentry setup Test!")
  }
  return (
    <div >
        <h1 style={{fontSize:"50px",textAlign:'center'}}>Solorder Setup</h1>
        <h1 style={{textAlign:'center'}}><button onClick={throwError}>Test Sentry</button></h1>
    </div>
  );
}

export default App;
