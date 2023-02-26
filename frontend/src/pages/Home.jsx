const Home = () => {
    return (
    <div>
      <h1>Login</h1>
      <div>
        <input type="text" placeholder='Username' onChange={() => {}} required/>
        <br/><br/>
        <input type="password" placeholder='Password' onChange={() => {}} required/>
      </div>
      <br></br>
      <button onClick = {() => {}}>Login</button>
    </div>
    );


}

export { Home };