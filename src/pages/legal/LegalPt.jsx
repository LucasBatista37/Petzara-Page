import LegalPage from '../LegalPage'
import terms from '../../../docs/TERMOS_DE_USO.md?raw'
import privacy from '../../../docs/POLITICA_DE_PRIVACIDADE.md?raw'

/** Original e versão válida (pt-BR). */
const DOCS = { terms, privacy, files: { 'TERMOS_DE_USO.md': 'terms', 'POLITICA_DE_PRIVACIDADE.md': 'privacy' } }

export default function LegalPt({ variant }) {
    return <LegalPage variant={variant} docs={DOCS} />
}
