import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import VotacaoCard from '../components/VotacaoCard';

export default function Index() {
  return (
    <View style={styles.container}>
     <Text style={styles.logo}>votie</Text>

      <View style={styles.busca}>
        <TextInput style={styles.input} placeholder="Buscar votação" />
        <Button title="Buscar" onPress={() => Alert.alert('Busca ainda não implementada')} />
      </View>

      <ScrollView style={styles.lista}>
        <VotacaoCard
          usuario="usuario1"
          pergunta="Qual capa ficou melhor pro meu trabalho de design?"
          opcaoA="Opção A"
          opcaoB="Opção B"
          percentA={62}
          percentB={38}
          votos={24}
        />
        <VotacaoCard
          usuario="usuario2"
          pergunta="Qual nome combina mais com meu gato novo?"
          opcaoA="Mingau"
          opcaoB="Tofu"
          percentA={45}
          percentB={55}
          votos={89}
        />
        <VotacaoCard
          usuario="usuario3"
          pergunta="Qual roupa devo usar na entrevista amanhã?"
          opcaoA="Social"
          opcaoB="Casual"
          percentA={71}
          percentB={29}
          votos={156}
        />
      </ScrollView>

      <View style={styles.menu}>
        <Button title="Início" onPress={() => Alert.alert('Você já está no início')} />
        <Button title="Criar" onPress={() => Alert.alert('Em construção')} />
        <Button title="Perfil" onPress={() => Alert.alert('Em construção')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#382F55',
    textAlign: 'center',
    marginBottom: 12,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECE7FB',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  lista: {
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECE7FB',
  },
});
