import LegalPage from '../LegalPage'
import terms from '../../../docs/legal/en/TERMS_OF_USE.md?raw'
import privacy from '../../../docs/legal/en/PRIVACY_POLICY.md?raw'

/** Tradução de referência (en), sem valor vinculante, pendente de revisão jurídica. */
const DOCS = { terms, privacy, files: { 'TERMS_OF_USE.md': 'terms', 'PRIVACY_POLICY.md': 'privacy' } }

export default function LegalEn({ variant }) {
    return <LegalPage variant={variant} docs={DOCS} />
}
