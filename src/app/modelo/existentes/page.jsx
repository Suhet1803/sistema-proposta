import { Navigation } from '../../../components/Navigation';
import { Documents } from './components/documents';

export default function ListaDePropostasPagina() {
  return (
    <div className="mt-16 flex flex-col gap-6">
      <Documents />
      <Navigation />
    </div>
  );
};