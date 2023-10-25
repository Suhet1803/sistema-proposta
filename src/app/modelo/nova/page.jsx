import { Navigation } from '../../../components/Navigation';
import { propostaModeloKey } from '../../../config/localstorage';
import { Editor } from '../components/Editor';

export default function PropostaNovaPagina() {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 mt-16 px-8 pb-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-black tracking-wider font-bold text-3xl font-sans">Criar nova proposta modelo</h1>
          <Editor storageKey={propostaModeloKey} />
        </div>

        <Navigation />
      </div>
    </>
  )
}