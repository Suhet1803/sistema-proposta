'use client'
import React, { useState } from 'react';

function ModelosPropostas() {
  // Defina o estado para acompanhar qual modelo de proposta está selecionado
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  // Lista de modelos de propostas (você pode adicionar mais modelos)
  const modelos = [
    {
      id: 1,
      nome: 'Modelo Proposta Global HITSS Padrão',
      url: 'https://docs.google.com/document/d/1DeE9jLrhPC5eyafcX-J1snCBWEfVLRYJ/edit?usp=share_link&ouid=110619996759442301936&rtpof=true&sd=true',
    },
    // Adicione mais modelos aqui
  ];

  // Função para lidar com a seleção de um modelo
  const selecionarModelo = (modelo) => {
    setModeloSelecionado(modelo);
  };


  
  
    
  
  
  // Código HTML que você deseja adicionar
  const codigoHTML = `
  <nav class="nav__cont">
  <ul class="nav">
    
    <li class="nav__items home-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <use xlink:href="#home"></use>
      </svg>
      <a href="/">Home</a>
    </li>
    
    <li class="nav__items proposta-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
       
      </svg>
      <a href="#" id="proposta-button">Proposta</a>
      <button onClick={() => selecionarModelo(modelos[0])}>Proposta Global HITSS Padrão</button>
    </li>
   
  </ul>
</nav>
`;




  return (
    <div className="container">
      {/* Inserir o código HTML como uma string no JSX */}
      <div dangerouslySetInnerHTML={{ __html: codigoHTML }}></div>

      <div className="sidebar">
        <h2></h2>
        <ul>
          {modelos.map((modelo) => (
            <li key={modelo.id}>
              <button onClick={() => selecionarModelo(modelo)}>{modelo.nome}</button>
            </li>
          ))}
        </ul>
      
      </div>
      <div className="conteudo">
        {modeloSelecionado ? (
          <iframe
            title="Modelo de Proposta"
            src={modeloSelecionado.url}
            width="100%"
            height="500px"
          ></iframe>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default ModelosPropostas;
