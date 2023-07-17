
import { useContext } from 'react';
import { ListBears } from '../../components/ListBears/ListBears';
import { StoreContext } from '../../components/App';
import styles from '../Home/Home.module.css';




export const Home = () => {
  const { bears,fetch } = useContext(StoreContext);  
  return (
    <div className={styles.Home}>      
      <ListBears bears={bears} fetch={fetch} />     
    </div> 
  );   
};
