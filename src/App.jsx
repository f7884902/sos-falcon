import { useEffect, useState } from 'react'
import { Home } from './pages/Home/Home'
import { Admin } from './pages/Admin/Admin'
import { useContent } from './hooks/useContent'

// Roteamento minimalista baseado em hash: evita o problema clássico de
// refresh de rotas do React Router no GitHub Pages, sem precisar de
// configuração adicional de servidor.
function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useRoute()
  const { content } = useContent()

  if (hash.startsWith('#/admin')) {
    return <Admin />
  }

  return <Home content={content} />
}
