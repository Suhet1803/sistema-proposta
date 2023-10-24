import { Navigation } from '../../../../components/Navigation';
import { EditDocument } from '../[id]/components/document';

export default function EditarPropostaPagina() {
  return (
    <div className="mt-16 flex flex-col gap-6 pb-8">
      <EditDocument />

      <Navigation />
    </div>
  )
}