import { useState, createContext, useEffect } from 'react';
// import PRODUCTS from './../shop-data.json';

// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);
  useEffect(()=> {
    const getCategoriesMap = async () => {

      const categoryMap = await getCategoriesAndDocuments();
      // categoryMap);
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  },[])
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
