import {createContext, useState} from "react";

export const PageBackdropContext = createContext();

export const PageBackdropProvider = function ({children}) {
    const [backdropImage, setBackdropImage] = useState(null);

    return (
        <PageBackdropContext.Provider value={{backdropImage, setBackdropImage}}>
            {backdropImage && (
                <>
                    <img className={'block fixed -z-10 w-full filter blur-md opacity-80'} src={backdropImage}/>
                    <div className={'fixed -z-10 w-full h-full'} style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.3), black 100vh, #14191a)'}}></div>
                </>
            )}
            {children}
        </PageBackdropContext.Provider>
    )
}