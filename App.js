import { useState } from 'react';
import { View } from 'react-native';
import Apresentacao from './components/Apresentacao';
import CriarVotacao from './components/CriarVotacao';

export default function App() {
  const [tela, setTela] = useState('apresentacao');

  return (
    <View style={{ flex: 1 }}>
      {tela === 'apresentacao' && (
        <Apresentacao irParaCriarVotacao={() => setTela('criarVotacao')} />
      )}
      {tela === 'criarVotacao' && (
        <CriarVotacao voltar={() => setTela('apresentacao')} />
      )}
    </View>
  );
}