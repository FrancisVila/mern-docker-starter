import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    welcome: "....",
    userList: [{name:"DDD"} ,{name:"VV"}],
    toto:1
  };
  

  componentDidMount = async () => {
    try {
      const res = await axios.get("/welcome");
      console.log("componentDidMount res=" + res);
      /*
      const res2 = await axios.get("/toto");
      console.log("componentDidMount res2=" +res2);
      this.setState({ welcome:   res.data});
      this.setState({ userList:   res2.data.users});
      console.log("componentDidMount res2.data[0]=" +res2.data.users[0]);
      console.log("componentDidMount res2=" +res2);
      */
    } catch (error) { 

      console.log(error);
    }
  };
  
  



  render() {
    function LiList (props) {
      return props.data.map(item =>  <li key={item.name}> {item.name} </li>)
    }
    return (
      <div className="App">
      <form method="post" action="/toto">
      <label>Enter User Name ss </label><br/>
      <input type="text" name="name" placeholder="Enter user name..." required />
      <input type="submit" value="Add Name" />
      </form>

<p>yyy</p>
<ul><LiList data={this.state.userList} /></ul>
<p>RRR</p>
        <h1>"Hello server SSS !" says the client</h1>
        <h1>"{this.state.welcome}" says the server FF</h1>
        
        <input name='button'  type='button'  value="toto"  onClick={(e) => { this.setState({ toto: this.state.toto+1}) }} />
        <p>{this.state.toto}</p>
      </div>
    );
  }
}

export default App;
