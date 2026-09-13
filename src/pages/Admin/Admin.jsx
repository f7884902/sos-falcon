import { useMemo, useState } from 'react'
import { useContent } from '../../hooks/useContent'
import './Admin.css'

const TABS = [
  { id: 'geral', label: 'Geral' },
  { id: 'hero', label: 'Hero' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'cta', label: 'CTA' },
]

const SESSION_KEY = 'sosfalcon:admin-session'

function ImageField({ label, value, onChange }) {
  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="admin__field">
      <label>{label}</label>
      <div className="admin__image-preview">
        <img src={value} alt="Pré-visualização" />
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>
    </div>
  )
}

function TextField({ label, value, onChange, textarea }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="admin__field">
      <label>{label}</label>
      <Tag value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

function LoginGate({ content, onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (password === content.admin.accessPassword) {
      window.sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError('Senha incorreta.')
    }
  }

  return (
    <div className="admin__login">
      <form className="admin__login-card" onSubmit={handleSubmit}>
        <h1>Painel Administrativo</h1>
        <p>
          Esta senha é apenas uma barreira de interface, definida em{' '}
          <code>src/data/siteContent.js</code>. Ela <strong>não</strong> é um mecanismo de
          autenticação seguro — qualquer pessoa com acesso ao código-fonte pode vê-la. Não a
          utilize para proteger informação sensível.
        </p>
        <div className="admin__field">
          <label htmlFor="admin-password">Senha de acesso</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </div>
        {error && <p className="admin__error">{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Entrar
        </button>
      </form>
    </div>
  )
}

export function Admin() {
  const { content, saveOverride, clearOverride, override } = useContent()
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(SESSION_KEY) === '1'
  )
  const [draft, setDraft] = useState(content)
  const [activeTab, setActiveTab] = useState('geral')
  const [statusMessage, setStatusMessage] = useState('')

  const hasUnsavedChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content])

  if (!isAuthenticated) {
    return <LoginGate content={content} onSuccess={() => setIsAuthenticated(true)} />
  }

  const updateDraft = (path, value) => {
    setDraft((prev) => {
      const next = structuredClone(prev)
      let cursor = next
      for (let i = 0; i < path.length - 1; i += 1) {
        cursor = cursor[path[i]]
      }
      cursor[path[path.length - 1]] = value
      return next
    })
  }

  const updateListItem = (listKey, index, field, value) => {
    setDraft((prev) => {
      const next = structuredClone(prev)
      next[listKey][index][field] = value
      return next
    })
  }

  const removeListItem = (listKey, index) => {
    setDraft((prev) => {
      const next = structuredClone(prev)
      next[listKey].splice(index, 1)
      return next
    })
  }

  const addGalleryItem = () => {
    setDraft((prev) => {
      const next = structuredClone(prev)
      next.gallery.push({
        image: 'images/placeholder.svg',
        alt: 'Nova imagem da galeria',
        caption: 'Nova imagem',
      })
      return next
    })
  }

  const handleSave = () => {
    saveOverride(draft)
    setStatusMessage('Alterações salvas neste navegador (localStorage). Lembre-se: isso ainda não publica no GitHub Pages.')
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'site-content.json'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setStatusMessage('Arquivo site-content.json exportado. Use-o para atualizar src/data/siteContent.js manualmente.')
  }

  const handleRestore = () => {
    clearOverride()
    setDraft(content)
    setStatusMessage('Conteúdo local restaurado ao padrão do projeto.')
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return (
    <div className="admin">
      <div className="container">
        <div className="admin__header">
          <div>
            <h1>Painel Administrativo</h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Editando conteúdo de {content.brand.fullName}
            </p>
          </div>
          <div className="admin__actions">
            <button type="button" className="btn btn-outline--dark" onClick={handleRestore}>
              Restaurar padrão
            </button>
            <button type="button" className="btn btn-outline--dark" onClick={handleExport}>
              Exportar conteúdo (JSON)
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={!hasUnsavedChanges}>
              Salvar neste navegador
            </button>
            <button type="button" className="admin__logout" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>

        <div className="admin__notice">
          <strong>Como isso funciona:</strong> o botão <em>Salvar neste navegador</em> grava as
          alterações no <code>localStorage</code> — elas aparecem apenas para quem acessa o site
          neste mesmo navegador/dispositivo e <strong>não são publicadas no GitHub Pages</strong>.
          Para publicar de verdade, clique em <em>Exportar conteúdo (JSON)</em>, baixe o arquivo e
          use-o para atualizar <code>src/data/siteContent.js</code> no repositório, depois rode{' '}
          <code>npm run deploy</code>. Imagens trocadas aqui ficam salvas como preview local; para
          publicá-las, salve o arquivo definitivo em <code>public/images/</code> e ajuste o
          caminho no JSON exportado.
          {override && (
            <>
              <br />
              <strong>Este navegador tem edições locais ativas</strong> sobrepondo o conteúdo
              padrão do projeto.
            </>
          )}
        </div>

        {statusMessage && <div className="admin__notice">{statusMessage}</div>}

        <div className="admin__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin__tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'geral' && (
          <div className="admin__panel">
            <h2>Informações gerais e contato</h2>
            <div className="admin__grid admin__grid--2">
              <TextField label="Nome da marca" value={draft.brand.name} onChange={(v) => updateDraft(['brand', 'name'], v)} />
              <TextField
                label="Nome completo"
                value={draft.brand.fullName}
                onChange={(v) => updateDraft(['brand', 'fullName'], v)}
              />
              <TextField
                label="Telefone (exibido)"
                value={draft.contact.phone}
                onChange={(v) => updateDraft(['contact', 'phone'], v)}
              />
              <TextField
                label="WhatsApp (somente números, com DDI 55)"
                value={draft.contact.whatsapp}
                onChange={(v) => updateDraft(['contact', 'whatsapp'], v)}
              />
              <TextField label="E-mail" value={draft.contact.email} onChange={(v) => updateDraft(['contact', 'email'], v)} />
              <TextField
                label="Instagram (link completo)"
                value={draft.contact.instagram}
                onChange={(v) => updateDraft(['contact', 'instagram'], v)}
              />
              <TextField
                label="Instagram (@handle exibido)"
                value={draft.contact.instagramHandle}
                onChange={(v) => updateDraft(['contact', 'instagramHandle'], v)}
              />
              <TextField
                label="Endereço / região de atuação"
                value={draft.contact.address}
                onChange={(v) => updateDraft(['contact', 'address'], v)}
              />
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="admin__panel">
            <h2>Seção Hero</h2>
            <div className="admin__grid">
              <TextField label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => updateDraft(['hero', 'eyebrow'], v)} />
              <TextField label="Título" value={draft.hero.title} onChange={(v) => updateDraft(['hero', 'title'], v)} textarea />
              <TextField
                label="Subtítulo"
                value={draft.hero.subtitle}
                onChange={(v) => updateDraft(['hero', 'subtitle'], v)}
                textarea
              />
              <TextField
                label="Texto do botão principal"
                value={draft.hero.ctaPrimaryLabel}
                onChange={(v) => updateDraft(['hero', 'ctaPrimaryLabel'], v)}
              />
              <TextField
                label="Texto do botão secundário"
                value={draft.hero.ctaSecondaryLabel}
                onChange={(v) => updateDraft(['hero', 'ctaSecondaryLabel'], v)}
              />
              <ImageField
                label="Imagem do Hero"
                value={draft.hero.image}
                onChange={(v) => updateDraft(['hero', 'image'], v)}
              />
            </div>
          </div>
        )}

        {activeTab === 'sobre' && (
          <div className="admin__panel">
            <h2>Seção Sobre</h2>
            <div className="admin__grid">
              <TextField label="Eyebrow" value={draft.about.eyebrow} onChange={(v) => updateDraft(['about', 'eyebrow'], v)} />
              <TextField label="Título" value={draft.about.title} onChange={(v) => updateDraft(['about', 'title'], v)} textarea />
              <TextField
                label="Descrição"
                value={draft.about.description}
                onChange={(v) => updateDraft(['about', 'description'], v)}
                textarea
              />
              <TextField
                label="Texto secundário"
                value={draft.about.secondaryText}
                onChange={(v) => updateDraft(['about', 'secondaryText'], v)}
                textarea
              />
              <ImageField
                label="Imagem principal"
                value={draft.about.image}
                onChange={(v) => updateDraft(['about', 'image'], v)}
              />
              <ImageField
                label="Imagem secundária"
                value={draft.about.secondaryImage}
                onChange={(v) => updateDraft(['about', 'secondaryImage'], v)}
              />
            </div>
          </div>
        )}

        {activeTab === 'servicos' && (
          <div className="admin__panel">
            <h2>Serviços</h2>
            {draft.services.map((service, index) => (
              <div className="admin__list-item" key={index}>
                <TextField
                  label="Título"
                  value={service.title}
                  onChange={(v) => updateListItem('services', index, 'title', v)}
                />
                <TextField
                  label="Descrição"
                  value={service.description}
                  onChange={(v) => updateListItem('services', index, 'description', v)}
                  textarea
                />
                <ImageField
                  label="Imagem"
                  value={service.image}
                  onChange={(v) => updateListItem('services', index, 'image', v)}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'galeria' && (
          <div className="admin__panel">
            <h2>Galeria</h2>
            {draft.gallery.map((item, index) => (
              <div className="admin__list-item" key={index}>
                <button
                  type="button"
                  className="admin__list-item-remove"
                  onClick={() => removeListItem('gallery', index)}
                >
                  Remover
                </button>
                <TextField
                  label="Legenda"
                  value={item.caption}
                  onChange={(v) => updateListItem('gallery', index, 'caption', v)}
                />
                <TextField
                  label="Texto alternativo (alt)"
                  value={item.alt}
                  onChange={(v) => updateListItem('gallery', index, 'alt', v)}
                />
                <ImageField label="Imagem" value={item.image} onChange={(v) => updateListItem('gallery', index, 'image', v)} />
              </div>
            ))}
            <button type="button" className="btn btn-outline--dark" onClick={addGalleryItem}>
              + Adicionar imagem
            </button>
          </div>
        )}

        {activeTab === 'cta' && (
          <div className="admin__panel">
            <h2>Seção de conversão (CTA)</h2>
            <div className="admin__grid">
              <TextField label="Título" value={draft.cta.title} onChange={(v) => updateDraft(['cta', 'title'], v)} textarea />
              <TextField
                label="Descrição"
                value={draft.cta.description}
                onChange={(v) => updateDraft(['cta', 'description'], v)}
                textarea
              />
              <TextField
                label="Texto do botão"
                value={draft.cta.buttonLabel}
                onChange={(v) => updateDraft(['cta', 'buttonLabel'], v)}
              />
              <ImageField label="Imagem de fundo" value={draft.cta.image} onChange={(v) => updateDraft(['cta', 'image'], v)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
