import { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { cores, espacamento, bordas } from '../design-system';

function gerarPorcentagem() {
  let p = 10 + Math.floor(Math.random() * 81);

  if (p === 50) {
    p = 51;
  }

  return p;
}

export default function CriarVotacao(props) {
  const [pergunta, setPergunta] = useState('');
  const [foto1, setFoto1] = useState(null);
  const [texto1, setTexto1] = useState('');
  const [foto2, setFoto2] = useState(null);
  const [texto2, setTexto2] = useState('');
  const [votacao, setVotacao] = useState(null);
  const [rodada, setRodada] = useState(0);

  const movimento = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(movimento, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(movimento, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  async function escolherFoto(lado) {
    const escolha = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!escolha.canceled) {
      const uri = escolha.assets[0].uri;

      if (lado === 1) {
        setFoto1(uri);
      } else {
        setFoto2(uri);
      }
    }
  }

  function animarResultado() {
    escala.setValue(0);

    Animated.spring(escala, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }

  function fazerVotacao() {
    const opcao1Vazia = !foto1 && !texto1.trim();
    const opcao2Vazia = !foto2 && !texto2.trim();

    if (opcao1Vazia || opcao2Vazia) {
      Alert.alert(
        'Calma!',
        'Cada opção precisa ter uma foto ou um texto.'
      );
      return;
    }

    setVotacao({
      pergunta: pergunta.trim(),
      foto1: foto1,
      texto1: texto1.trim() || 'Opção 1',
      foto2: foto2,
      texto2: texto2.trim() || 'Opção 2',
      p1: gerarPorcentagem(),
    });

    setRodada(1);
    animarResultado();
  }

  function refazerVotacao() {
    setVotacao({ ...votacao, p1: gerarPorcentagem() });
    setRodada(rodada + 1);
    animarResultado();
  }

  function fazerOutraVotacao() {
    setVotacao(null);
    setRodada(0);
    setPergunta('');
    setFoto1(null);
    setTexto1('');
    setFoto2(null);
    setTexto2('');
  }

  function renderBarra(texto, porcentagem, vencedor) {
    return (
      <View style={styles.barraContainer}>

        <View style={styles.barraTopo}>
          <Text
            style={[
              styles.barraNome,
              vencedor ? styles.barraNomeVencedor : null,
            ]}
            numberOfLines={1}
          >
            {texto}
          </Text>

          <Text style={styles.barraPorcentagem}>
            {porcentagem}%
          </Text>
        </View>

        <View style={styles.barraTrilho}>
          <View
            style={[
              styles.barraPreenchimento,
              vencedor ? styles.barraPreenchimentoVencedor : null,
              { width: porcentagem + '%' },
            ]}
          />
        </View>

      </View>
    );
  }

  if (votacao) {
    const p2 = 100 - votacao.p1;
    const venceu1 = votacao.p1 > 50;
    const fotoVencedora = venceu1 ? votacao.foto1 : votacao.foto2;
    const nomeVencedor = venceu1 ? votacao.texto1 : votacao.texto2;

    return (
      <View style={styles.containerResultado}>

        <Image
          source={require('../assets/fundo2.png')}
          style={styles.fundo}
          resizeMode="cover"
        />

        <Animated.View
          style={[
            styles.logoContainerResultado,
            {
              transform: [{ translateY: movimento }],
            },
          ]}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoResultado}
            resizeMode="contain"
          />
        </Animated.View>

        <TouchableOpacity
          style={styles.voltar}
          onPress={props.voltar}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/voltar.png')}
            style={styles.botaoVoltar}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollResultado}
          contentContainerStyle={styles.resultadoConteudo}
          showsVerticalScrollIndicator={false}
        >

          {votacao.pergunta ? (
            <Text style={styles.perguntaResultado}>
              {votacao.pergunta}
            </Text>
          ) : null}

          <Text style={styles.rodada}>
            Votação {rodada}
          </Text>

          <Text style={styles.tituloVencedor}>
            Vencedor
          </Text>

          <Animated.View
            style={{
              transform: [{ scale: escala }],
            }}
          >
            {fotoVencedora ? (
              <Image
                source={{ uri: fotoVencedora }}
                style={styles.fotoGrande}
              />
            ) : (
              <View style={styles.fotoGrande} />
            )}
          </Animated.View>

          <Text style={styles.nomeVencedor}>
            {nomeVencedor}
          </Text>

          <View style={styles.barras}>
            {renderBarra(votacao.texto1, votacao.p1, venceu1)}
            {renderBarra(votacao.texto2, p2, !venceu1)}
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={refazerVotacao}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>
              Refazer votação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={fazerOutraVotacao}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>
              Fazer outra votação
            </Text>
          </TouchableOpacity>

        </ScrollView>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/fundo.png')}
        style={styles.fundo}
        resizeMode="cover"
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ translateY: movimento }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <TouchableOpacity
        style={styles.voltar}
        onPress={props.voltar}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/voltar.png')}
          style={styles.botaoVoltar}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TextInput
        style={styles.perguntaInput}
        placeholder="Digite sua pergunta"
        placeholderTextColor="#a2a2a2"
        value={pergunta}
        onChangeText={setPergunta}
      />

      <View style={styles.linha}>

        <View style={styles.opcao}>

          <TouchableOpacity
            style={styles.molduraContainer}
            onPress={() => escolherFoto(1)}
            activeOpacity={0.8}
          >

            {foto1 ? (
              <Image
                source={{ uri: foto1 }}
                style={styles.fotoDentro}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.textoFoto}>
                Coloque uma foto
              </Text>
            )}

            <Image
              source={require('../assets/moldura.png')}
              style={styles.moldura}
              resizeMode="stretch"
            />

          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Digite sua opção"
            placeholderTextColor="#a2a2a2"
            value={texto1}
            onChangeText={setTexto1}
          />

        </View>

        <View style={styles.opcao}>

          <TouchableOpacity
            style={styles.molduraContainer}
            onPress={() => escolherFoto(2)}
            activeOpacity={0.8}
          >

            {foto2 ? (
              <Image
                source={{ uri: foto2 }}
                style={styles.fotoDentro}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.textoFoto}>
                Coloque uma foto
              </Text>
            )}

            <Image
              source={require('../assets/moldura.png')}
              style={styles.moldura}
              resizeMode="stretch"
            />

          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Digite sua opção"
            placeholderTextColor="#a2a2a2"
            value={texto2}
            onChangeText={setTexto2}
          />

        </View>

      </View>

      <TouchableOpacity
        onPress={fazerVotacao}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/fazer-votacao.png')}
          style={styles.botaoFazerVotacao}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },

  fundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 200,
  },

  voltar: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 5,
  },

  botaoVoltar: {
    width: 90,
    height: 50,
  },

  perguntaInput: {
    position: 'absolute',
    top: 190,
    width: '80%',
    height: 50,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 80,
    marginBottom: espacamento.grande,
  },

  opcao: {
    width: 180,
    alignItems: 'center',
  },

  molduraContainer: {
    width: 160,
    height: 202,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  fotoDentro: {
    position: 'absolute',
    top: 30,
    left: 17,
    width: 126,
    height: 130,
  },

  moldura: {
    position: 'absolute',
    width: 160,
    height: 202,
    top: 0,
    left: 0,
  },

  textoFoto: {
    position: 'absolute',
    top: 70,
    color: cores.textoSecundario,
    fontSize: 10,
    zIndex: 1,
    textAlign: 'center',
  },

  input: {
    width: 125,
    height: 40,
    marginTop: 2,
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  botaoFazerVotacao: {
    width: 250,
    height: 80,
  },

  containerResultado: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: cores.fundo,
  },

  logoContainerResultado: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },

  logoResultado: {
    width: 200,
    height: 150,
  },

  scrollResultado: {
    width: '100%',
    marginTop: 150,
  },

  resultadoConteudo: {
    alignItems: 'center',
    paddingHorizontal: espacamento.grande,
    paddingBottom: 40,
  },

  perguntaResultado: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  rodada: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 12,
  },

  tituloVencedor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: espacamento.medio,
  },

  fotoGrande: {
    width: 180,
    height: 180,
    borderRadius: bordas.card,
    backgroundColor: cores.cardBorda,
  },

  nomeVencedor: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: espacamento.medio,
    fontWeight: 'bold',
  },

  barras: {
    width: '100%',
    marginBottom: espacamento.medio,
  },

  botao: {
    backgroundColor: cores.destaque,
    paddingVertical: 14,
    paddingHorizontal: espacamento.grande,
    borderRadius: bordas.pilula,
  },

  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 13,
    paddingHorizontal: espacamento.grande,
    borderRadius: bordas.pilula,
    marginTop: 12,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  barraContainer: {
    width: '100%',
    marginBottom: 14,
  },

  barraTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 6,
  },

  barraNome: {
    flex: 1,
    color: '#8c8c8c',
    fontSize: 15,
    marginRight: 10,
  },

  barraNomeVencedor: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  barraPorcentagem: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  barraTrilho: {
    width: '100%',
    height: 14,
    backgroundColor: '#222222',
    borderRadius: bordas.pilula,
    overflow: 'hidden',
  },

  barraPreenchimento: {
    height: '100%',
    backgroundColor: '#555555',
    borderRadius: bordas.pilula,
  },

  barraPreenchimentoVencedor: {
    backgroundColor: '#FFFFFF',
  },
});