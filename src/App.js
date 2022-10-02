import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/properties/:propId' element={<PropertyDetails/>}></Route>
      <Route path='/search' element={<Search/>}/>
    </Routes>
  );
}

export default App;
