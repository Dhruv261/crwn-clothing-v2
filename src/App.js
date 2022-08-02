import { Routes, Route } from 'react-router-dom';

import Home from './components/routes/home.component';
import SignIn from './components/routes/sign-in/sing-in.component';
import Navigation from './components/routes/navigation/navigation.component';

const Shop = () => {
  return <h1>Shop Page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='signin' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
