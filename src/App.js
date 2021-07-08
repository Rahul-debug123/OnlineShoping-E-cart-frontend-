import User from './components/user/User';
import Cookies from 'universal-cookie';

const cookies=new Cookies();


function App() {
  return (
    <div className="App">
      <User />
      <div>{cookies.get('user_token')}</div>
    </div>
  );
}

export default App;
