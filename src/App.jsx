import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import BasicCalculator from './pages/BasicCalculator';
import FireCalculator from './pages/FireCalculator';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='basic' element={<BasicCalculator />} />
          <Route path='fire' element={<FireCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}