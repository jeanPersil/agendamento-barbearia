import React, { useState, useEffect } from 'react'
import axios from 'axios'
import App from './App' 
import Auth from "../components/auth/auth.jsx" 

export default props => {
    const [user, setUser] = useState(null)
    const [validatingToken, setValidatingToken] = useState(true)

    useEffect(() => {
        validateToken()
    }, [])

    async function validateToken() {
        setValidatingToken(true)
        const json = localStorage.getItem('barbearia_user_key') // Chave que guardou no browser
        const userData = JSON.parse(json)
        
        // Se não tiver usuário salvo, manda pro login
        if(!userData || !userData.token) {
            setValidatingToken(false)
            setUser(null)
            return
        }

        setUser(userData)
        setValidatingToken(false)
    }

    function handleLogin(userData) {
        localStorage.setItem('barbearia_user_key', JSON.stringify(userData))
        setUser(userData)
    }

    function handleLogout() {
        localStorage.removeItem('barbearia_user_key')
        setUser(null)
    }

    if(validatingToken) {
        return <div>Carregando...</div>
    }

    if(!user) {
        return <Auth onLoginSuccess={handleLogin} />
    }

 
    return <App onLogout={handleLogout} /> 
}