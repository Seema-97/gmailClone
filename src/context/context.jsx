import { createContext, useContext, useState } from "react";


const myContext = createContext()

export const useMyContext = () => {
    return useContext(myContext);
  };

const ContextProvider = ({children}) => {
    const[mailViewOpen , setMailViewOpen] = useState(false)
    const[mailContent , setMailContent] = useState('')

    return (
        
            <myContext.Provider value={{mailViewOpen , setMailViewOpen , mailContent , setMailContent}}>
               {children}
            </myContext.Provider>
    )
    
}

export default ContextProvider