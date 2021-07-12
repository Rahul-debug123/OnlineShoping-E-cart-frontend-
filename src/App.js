import React,{Component} from 'react'
import NavBar from './components/navbar/navbar';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const tokenVerify_url="http://localhost:9000/verifytoken"
const cookies=new Cookies();


class App extends Component {
  constructor(){
    super()
    this.state={
      isAuth:false,
      first_name:'',
      isAdmin:'',
      id:'',
      user_token:'',
    }
  }
  onTokenChange=(event)=>{
    this.setState({user_token:cookies.get('user_token')})
  }
  componentWillMount(){
    this.setState({user_token:cookies.get('user_token')});
      };

  render (){
    if((this.state.user_token && !this.state.isAuth)||
        (!this.state.user_token && this.state.isAuth)){
      const requestMetadata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"token":this.state.user_token})
        };
  
        fetch(tokenVerify_url, requestMetadata)
        .then(res => res.json())
        .then(res =>{
          if(res.access){
            this.setState({first_name:res.info.first_name,
                            id:res.info.id,isAdmin:res.info.isAdmin,
                            isAuth:true})
          }
          else {
            this.setState({isAuth:false,})
          }
        });
    }
    // <User TokenChange={this.onTokenChange}/>
    return(
      <div className="App">
        <Router>
        <NavBar status={this.state} 
                options={[["Home","/"],["About","/about"],["Contact","/contact"]]}
                TokenChange={this.onTokenChange}/>
        </Router>
      <div>{JSON.stringify(this.state)}</div>
    </div>
    )
  }
}

export default App;