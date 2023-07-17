import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect} from 'react'

import { Home } from '../Pages/Home/Home';
import { BearsCart } from '../Pages/BearsCart/BearsCart';

import { create } from 'zustand'


const useBearStore = create((set) => ({
  bears: [],  
  fetch: async(page) => {
    const array = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`).then((response) => {
      return response.json();
    }).then((data) => {      
      return data      
    })    
    set({ bears: array })
  } 
}))

 
export const StoreContext = createContext();

export const App = () => {
  const { bears, fetch } = useBearStore()
  
  useEffect(() => {
    fetch(1);    
  }, [fetch])

  return (
    <StoreContext.Provider value={{ bears: bears,fetch:fetch }}>
      <BrowserRouter >   
        <Routes>    
          <Route path="" element={<Home/>} />
          <Route path="bears/:bearId" element={<BearsCart/>} />           
        </Routes>          
      </BrowserRouter>
    </StoreContext.Provider>    
  );
};
  

 
