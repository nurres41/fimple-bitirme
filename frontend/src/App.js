import { Routes, Route } from 'react-router-dom'
import CreateApplication from './components/publicApplication/CreateApplication';
import SuccessApplication from './components/publicApplication/SuccessApplication';
import QueryApplication from './components/publicApplication/QueryApplication';
import ResultApplication from './components/publicApplication/ResultApplication';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='bg-gray-200'>
    <Navbar />
    <Routes>
      <Route path='/basvuru-olustur' element={<CreateApplication />}></Route>
      <Route path='/basvuru-basarili' element={<SuccessApplication />}></Route>
      <Route path='/basvuru-sorgula' element={<QueryApplication />}></Route>
      <Route path='/basvuru-sorgula/:basvuruNo' element={<ResultApplication />}></Route>
    </Routes>
    </div>
  );
}

export default App;
