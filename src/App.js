import React , { useState, useEffect } from "react";
import api from './services/api'
import Header from './components/Header'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const {status, data} = await api.post('repositories', {
      title: `Myrepo ${Date.now()}`,
      url: `http://github.com/lmgomes1/${Date.now()}`,
      techs: 'ReacJS'
    })
    if(status === 200){
      setRepositories([...repositories, data])
    }

  }

  async function handleRemoveRepository(id) {
      try {
        const {status} = await api.delete('repositories/'+id)
        if(status === 204){
          setRepositories(repositories.filter(repository => repository.id !== id))
        }
      } catch (error) {
        alert('Faild to delete')  
      }
  }

  return (
    <div>
      <>
      <Header/>
      </>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
