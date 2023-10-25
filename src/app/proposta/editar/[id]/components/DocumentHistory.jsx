'use client';

import { UniqueDocumentHistory } from './UniqueDocumentHistory';

export function DocumentHistory({
  setDocumentsHistory,
  documentsHistory,
  foundDocumentsHistory
}) {

  return (
    <div className="max-w-5xl w-full mx-auto px-8 flex flex-col gap-8 mt-8">
      <div className='flex flex-col gap-4'>
        <h1 className="text-black tracking-wider font-bold text-3xl font-sans">Historico desta proposta ({documentsHistory?.length ?? 0})</h1>

        <div className="flex flex-col gap-8">
          {documentsHistory && documentsHistory.map(document => (
            <UniqueDocumentHistory key={document.id} setDocumentsHistory={setDocumentsHistory} document={document} foundDocumentsHistory={foundDocumentsHistory} />
          ))}
        </div>
      </div>
    </div>
  );
}