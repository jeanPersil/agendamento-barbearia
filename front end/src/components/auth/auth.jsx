import "./auth.css"
import React from "react"

const baseUrl = 'http://localhost:3001' 

export default props => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function submit(e) {
        e.preventDefault()
        
        axios.post(`${baseUrl}/login`, { email, senha })
            .then(resp => {
                props.onLoginSuccess(resp.data)
            })
            .catch(e => alert('Erro: Verifique email/senha'))
    }

    return (
        <div className="auth-content">
            <div className="auth-modal">
                <span className="auth-title">Login da Barbearia</span>
                <form onSubmit={submit} className="w-100">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary w-100">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}