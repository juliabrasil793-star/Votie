import { View, Text, StyleSheet } from 'react-native';

export default function VotacaoCard(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.usuario}>{props.usuario}</Text>
      <Text style={styles.pergunta}>{props.pergunta}</Text>

      <View style={styles.opcoes}>
        <View style={styles.opcaoA}>
          <Text style={styles.opcaoTexto}>{props.opcaoA} - {props.percentA}%</Text>
        </View>
        <View style={styles.opcaoB}>
          <Text style={styles.opcaoTexto}>{props.opcaoB} - {props.percentB}%</Text>
        </View>
      </View>

      <Text style={styles.votos}>{props.votos} votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECE7FB',
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#382F55',
    marginBottom: 4,
  },
  pergunta: {
    fontSize: 15,
    color: '#382F55',
    marginBottom: 10,
  },
  opcoes: {
    flexDirection: 'row',
  },
  opcaoA: {
    flex: 1,
    backgroundColor: '#FFD8BE',
    padding: 10,
    borderRadius: 10,
    marginRight: 6,
  },
  opcaoB: {
    flex: 1,
    backgroundColor: '#9381FF',
    padding: 10,
    borderRadius: 10,
    marginLeft: 6,
  },
  opcaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  votos: {
    marginTop: 10,
    fontSize: 12,
    color: '#8983AA',
  },
});
