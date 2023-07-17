import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import styles  from '../ListBears/ListBears.module.css';
import { PropTypes } from 'prop-types';
import { create } from 'zustand';



const useCheckStore = create((set) => ({ 
  deletedElements: [],  
  setDeletedElements: (data) => {set({ deletedElements: data })}
}))

export const ListBears = ( { bears,fetch }) => {    
    const n = 15;
    const location = useLocation();
    const { deletedElements, setDeletedElements } = useCheckStore();
    const [isShow, setIsShow] = useState(false);
    const [page, setPage] = useState(2); 


    for (let i = 0; i < deletedElements.length; i++) {      
        for (let l = 0; l < bears.length; l++){
            if (bears[l].id === Number(deletedElements[i])) {
                bears.splice(bears.indexOf(bears[l]), 1,"*");
            }           
        }        
    }   

    
    const arrayLi =bears.filter(bear => bear !== "*");    
 
   
    const showButton = () => {        
        const chbox = document.querySelectorAll('input')       
        for (let i = 0; i < chbox.length; i++){
            if (chbox[i].checked === true) {
                setIsShow(true)
                break
            } else {
               setIsShow(false) 
            }
        }          
    }
  
 
    const bearDelete = () => {
        const checkedArray = [];
        const checkedArrayStart = [];
        
        const chbox = document.querySelectorAll('input') 
        
        for (let i = 0; i < chbox.length; i++){        
            if (chbox[i].checked) {                
                checkedArray.push(chbox[i].id)
            };    
        } 
        const checkedArrayAll = deletedElements.concat(checkedArray);

        if (checkedArrayAll.length>= 26-n) {            
            setDeletedElements(checkedArrayStart)
            fetch(page);
            setPage(page + 1);
            setIsShow(false);
            document.getElementById('my_form').reset()
        } else {
            setDeletedElements(checkedArrayAll);
            setIsShow(false);
            document.getElementById('my_form').reset()
        }          
    }

    return ( 
        <>
            <form className={styles.ListBears} id="my_form">                          
                {arrayLi.slice(0,n).map((bear) => ( 
                    <div className={styles.Flex} key={bear.id}>
                        <label>
                            {bear.id}
                            <input type="checkbox" onClick={showButton} name="bear" value={bear.name} id={bear.id}/>                       
                            <Link  state={{from:location}} to={`bears/${ bear.id}`} className={styles.link}>{bear.name}</Link>
                        </label>                        
                    </div>
                ))}
                {isShow && <button type='button' id="delete" onClick={bearDelete}>Delete</button>}                
            </form>            
        </>                 
    );
}  
   
ListBears.propTypes = { 
    bears: PropTypes.arrayOf(PropTypes.shape()),
    fetch :PropTypes.func,
}



