'use client';

import Link from 'next/link';
import styles from '../../styles/Button.module.css';

export function Navigation() {
  return (
    <nav className="flex items-center justify-center gap-4 flex-wrap max-w-6xl w-full mx-auto">
      <Link href="/" className={styles.button}>
        Tela inicial
        <span className={styles.tooltip}>
          Ir para tela inicial da aplicação
        </span>
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link href="/proposta/existentes" className={styles.button}>
          Lista de Propostas Existentes
          <span className={styles.tooltip}>
            Ação para vizualizar suas propostas existentes dentro do sistema
          </span>
        </Link>
        <Link href="/proposta/nova" className={styles.button}>
          Proposta Nova
          <span className={styles.tooltip}>
            Ação de criação de uma proposta nova, já com os dados preedefinidos,mas com o modelo normal de proposta
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Link href="/modelo/nova" className={styles.button}>
          Nova proposta Modelo
          <span className={styles.tooltip}>
            Criação de uma proposta com base no modelo de uma proposta existente
          </span>
        </Link>
        <Link href="/modelo/existentes" className={styles.button}>
          Lista de Propostas Modelo
          <span className={styles.tooltip}>
            Lista de propostas modelo existentes
          </span>
        </Link>
      </div>
    </nav>
  );
}