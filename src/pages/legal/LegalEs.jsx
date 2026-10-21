import LegalPage from '../LegalPage'
import terms from '../../../docs/legal/es/TERMINOS_DE_USO.md?raw'
import privacy from '../../../docs/legal/es/POLITICA_DE_PRIVACIDAD.md?raw'

/** Tradução de referência (es), sem valor vinculante, pendente de revisão jurídica. */
const DOCS = { terms, privacy, files: { 'TERMINOS_DE_USO.md': 'terms', 'POLITICA_DE_PRIVACIDAD.md': 'privacy' } }

export default function LegalEs({ variant }) {
    return <LegalPage variant={variant} docs={DOCS} />
}
