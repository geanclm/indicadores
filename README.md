# 📈 Projeto Indicadores

> **Laboratório de Pesquisa Aplicada em Macroeconomia, Ciência de Dados e Inteligência Artificial.**

---

## 📌 Visão Geral

O **Projeto Indicadores** é uma plataforma de inteligência quantitativa e análise de dados focada na transformação de séries históricas dispersas do mercado financeiro e da economia brasileira em conhecimento estruturado, visualizações de alta performance e pareceres analíticos automatizados.

O ecossistema reúne engenharia de pipeline para coleta e normalização de dados, análise de correlações cruzadas (*cross-asset*) e experimentação avançada com múltiplos modelos de Linguagem de Grande Porte (LLMs), avaliando performance, custos (FinOps) e cognição analítica regional.

---

## 🎯 Objetivos do Projeto

* **Coleta Automatizada:** Integração direta com fontes oficiais como o Banco Central do Brasil (SGS/BCB) e dados de mercado via Yahoo Finance (`yfinance`).
* **Tratamento & Normalização Quantitativa:** Aplicação de algoritmos de reescalonamento (*MaxAbsScaler* / *MinMaxScaler*) para permitir a comparação harmônica entre taxas percentuais (% a.a. e % m.m.), cotações cambiais (R$) e números-índices de atividade e mercado.
* **Análise Cross-Asset Integrada:** Monitoramento unificado do comportamento conjunto de:
  * 🏛️ **Taxa Selic:** Custo de capital e política monetária (BCB).
  * 🛒 **IPCA & IGP-M:** Inflação oficial ao consumidor e inflação de atacado/contratos (IBGE / FGV).
  * 💵 **Dólar Comercial:** Câmbio e risco externo.
  * 📊 **IMA-B:** Índice de títulos públicos atrelados à inflação (Marcação a Mercado - ANBIMA).
  * 🏭 **IBC-Br:** Termômetro da atividade econômica real (Proxy mensal do PIB - BCB).
* **Multi-LLM Benchmarking & Cognição de IA:** Testes de avaliação comparativa em tempo real entre modelos internacionais de ponta e modelos nativos brasileiros (como a família **Sabiá-4**, **Sabiazinho-4** e **Sabiá-4 Thinking** da **Maritaca AI**).
* **Observabilidade e FinOps:** Monitoramento automatizado do custo financeiro efetivo (em BRL/USD) de cada chamada de IA, além de métricas de vazão (*tokens/segundo*) e tempo de execução.
* **Interface & Segurança:** Dashboard executivo com design *Dark Mode* de alta legibilidade, protegido por arquitetura de autenticação desacoplada (*Auth Guard*).

---

## 🏗️ Arquitetura do Sistema

```text
[ Fontes de Dados ]            [ Pipeline Quantitativo ]           [ Camada de Cognição (IA) ]
 - BCB (SGS API)    ------->    - Pandas & Scikit-learn   ------->   - Maritaca AI (Sabiá-4)
 - Yahoo Finance                 - Normalização Scaler               - OpenAI (GPT-5.5)
 - Anbima / IBGE                 - Cálculo de Daily Returns          - Anthropic (Claude)
                                 - Plotagem Dark Executiva           - Hugging Face / Google

                                           |
                                           v
                             [ Dashboard & JSON Feed ]
                              - Visualização Cross-Asset
                              - FinOps (Custo/Tokens)
                              - Parecer Executivo