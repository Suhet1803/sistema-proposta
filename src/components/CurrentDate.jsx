'use client';

export function CurrentDate() {
  const obterDataAtual = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const dataAtual = obterDataAtual();

  return (
    <span className="text-3xl font-bold">
      Data atual: {dataAtual}
    </span>
  )
}