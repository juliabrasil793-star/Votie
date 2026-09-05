# Votie

Aplicativo mobile para ajudar pessoas a tomarem decisões entre duas opções de forma simples, visual e divertida.

## Sobre o projeto

O Votie é um aplicativo mobile desenvolvido para a disciplina de Desenvolvimento de Aplicativos Móveis.

A proposta do aplicativo é ajudar o usuário em situações em que ele está indeciso entre duas opções. Para isso, o usuário pode criar uma votação com uma pergunta e duas alternativas, podendo utilizar textos, imagens ou os dois.

Após criar a votação, o Votie apresenta um resultado entre as duas opções, acompanhado de porcentagens que representam a votação.

## Problema

No dia a dia, muitas pessoas têm dificuldade para escolher entre duas opções, como:

- Qual roupa usar;
- Qual foto postar;
- Qual nome escolher;
- Qual opção comprar;
- Qual alternativa combina mais com determinada situação.

Normalmente, essas decisões são feitas de maneira informal ou simplesmente por tentativa e erro.

O Votie busca oferecer uma forma simples e visual de transformar essas dúvidas em uma votação entre duas alternativas.

## Objetivo

Desenvolver um aplicativo mobile simples e intuitivo que permita ao usuário criar votações entre duas opções e visualizar um resultado.

O aplicativo também busca proporcionar uma experiência visual agradável e fácil de utilizar, utilizando imagens e elementos gráficos próprios para a identidade do Votie.

## Como funciona

O funcionamento principal do Votie é baseado em seis etapas:

1. O usuário acessa o aplicativo;
2. Cria uma pergunta;
3. Adiciona duas opções;
4. Cada opção pode conter texto, imagem ou os dois;
5. O usuário realiza a votação;
6. O Votie apresenta uma das opções como resultado.

## Funcionalidades

### Funcionalidades já desenvolvidas

- Tela inicial de apresentação;
- Identidade visual própria;
- Navegação entre a tela inicial e a tela de criação;
- Criação de uma pergunta;
- Criação de duas opções;
- Adição de imagens às opções;
- Adição de textos às opções;
- Permissão para utilizar somente imagem;
- Permissão para utilizar somente texto;
- Permissão para utilizar imagem e texto juntos;
- Validação para impedir uma votação quando alguma das opções estiver completamente vazia;
- Realização da votação;
- Exibição da opção vencedora;
- Animação na apresentação do resultado;
- Botão para voltar à tela inicial;
- Botão para iniciar uma nova votação.

### Funcionalidades planejadas

- Refazer uma votação mantendo a mesma pergunta e as mesmas opções;
- Gerar novos resultados ao refazer uma votação;
- Exibir porcentagens diferentes para cada resultado, como 15% e 85%;
- Garantir que as porcentagens das duas opções sempre totalizem 100%;
- Separar as ações de "Refazer votação" e "Fazer outra votação";
- Criar um histórico das votações realizadas;
- Permitir visualizar votações anteriores no histórico.

## Tecnologias

- JavaScript
- React Native
- Expo

## Ferramentas

- Visual Studio Code
- Git
- GitHub
- Expo Go

## Cronogrâma

23/08 — Semana 1: Planejamento e protótipo
Definição da ideia inicial do Votie;
Definição do escopo;
Criação da identidade visual;
Definição da paleta visual;
Criação do protótipo;
Estrutura inicial do projeto;
Criação do projeto em React Native + Expo;
Criação do repositório no GitHub.

30/08 — Semana 2: Estrutura e desenvolvimento inicial
Organização da estrutura do projeto;
Criação dos componentes principais;
Desenvolvimento da tela de apresentação;
Desenvolvimento da navegação inicial;
Criação da tela de criação de votação;
Implementação dos campos de pergunta e opções;
Implementação da seleção de imagens;
Testes da aplicação;
Atualização do projeto no GitHub.

06/09 — Semana 3: Criação da votação
Finalização da tela de criação de votação;
Implementação das opções com texto e/ou imagem;
Validação das opções;
Implementação da realização da votação;
Desenvolvimento da tela de resultado;
Exibição da opção vencedora;
Implementação das animações;
Ajustes visuais.

13/09 — Semana 4: Resultados e novas votações
Implementação da função "Refazer votação";
Implementação da função "Fazer outra votação";
Geração de novos resultados;
Implementação das porcentagens;
Ajustes na apresentação dos resultados;
Testes dos diferentes tipos de votação.

20/09 — Semana 5: Histórico e refinamento
Desenvolvimento do histórico de votações;
Exibição das votações realizadas;
Organização das informações do histórico;
Testes dos principais fluxos;
Correção de erros;
Melhorias na experiência de uso.

27/09 — Semana 6: Testes, correções e polimento
Correção dos bugs encontrados;
Ajustes visuais finais;
Ajustes de espaçamento;
Ajustes de textos;
Revisão da navegação;
Revisão da estrutura do código;
Organização dos arquivos;
Atualização da documentação;
Revisão final do README.

30/09 — Entrega final
Testes gerais da aplicação;
Validação das funcionalidades;
Correções finais;
Preparação da apresentação;
Organização do projeto;
Publicação da versão final no GitHub.

## Observação sobre o desenvolvimento

Durante o desenvolvimento, a proposta inicial do projeto precisou ser adaptada.
O planejamento inicial previa uma aplicação com características de rede social, incluindo cadastro, login, feed, perfil, comentários e histórico de participação.

Durante a implementação, percebi a necessidade de reduzir o escopo para conseguir desenvolver uma aplicação funcional dentro do período disponível e de acordo com o nível de complexidade possível para o projeto.

Por esse motivo, a proposta foi reformulada para concentrar o Votie em sua função principal: ajudar o usuário a escolher entre duas opções.
Apesar da mudança de escopo, os principais conceitos da proposta foram mantidos, como a criação de votações, a utilização de duas opções e a apresentação de um resultado.

A decisão de adaptar o projeto teve como objetivo priorizar uma aplicação funcional, organizada e com uma identidade visual própria, em vez de manter funcionalidades que não poderiam ser implementadas adequadamente dentro do prazo.
