import { useParams, Link, useLocation } from 'react-router-dom';
import { useContext} from 'react';
import { StoreContext } from '../../components/App';
import styles from '../CartBear/CartBear.module.css';

export const CartBaer = () => { 
  
  const {bears} = useContext(StoreContext);
  const { bearId } = useParams();
  const location = useLocation();
  
  const bearFind = () => {
    for (let i = 0; i <= bears.length-1; i++){
      if (bears.length !== 0 && bears[i].id === Number(bearId)) {
      
        return bears[i];    
      }
    }   
  }

  const bear = bearFind();

  return (     
    <div className={styles.Conteiner}>
      <Link to={location.state?.from?? ""} >Go back</Link>  
      {bears.length !== 0 && <div className={styles.Flex}>
        <div>
          <h1>{bear.name}</h1>
          <p>{bear.brewers_tips}</p>
          <p>{bear.description}</p>
        </div>
        <img src={bear.image_url} alt="" className={styles.image} />
      </div>}               
    </div>    
                 
  );  
}

