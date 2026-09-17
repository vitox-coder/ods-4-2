
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  const [mostrarMais, setMostrarMais] = useState(false);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.worldbank.org/v2/country/BRA/indicator/SE.SEC.ENRR?format=json&per_page=10"
    )
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar dados");
        }

        return resposta.json();
      })
      .then((resultado) => {
        setDados(resultado[1] || [])
        setCarregando(false);
      })
      .catch(() => {
        setErro(true);
        setCarregando(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <section id="inicio" className="hero">
          <h1>ODS 4 – Educação de Qualidade</h1>

          <p>
            Garantir uma educação inclusiva, equitativa e de qualidade,
            promovendo oportunidades de aprendizagem para todos.
          </p>

          <button onClick={() => setMostrarMais(!mostrarMais)}>
            {mostrarMais ? "Mostrar menos" : "Saiba mais"}
          </button>

          {mostrarMais && (
            <p className="extra">
              A educação de qualidade contribui para o desenvolvimento das
              pessoas, amplia oportunidades e ajuda na construção de uma
              sociedade mais preparada para o futuro.
            </p>
          )}
        </section>

        <section id="sobre" className="section">
          <h2>O que é o ODS 4?</h2>

          <p>
            O ODS 4 busca assegurar uma educação de qualidade, inclusiva e
            acessível, promovendo oportunidades de aprendizagem ao longo da
            vida.
          </p>
        </section>

        <section id="importancia" className="section">
          <h2>Importância da Educação</h2>

          <div className="cards">
            <Card
              titulo="Conhecimento"
              texto="A educação ajuda as pessoas a desenvolver conhecimentos e habilidades."
            />

            <Card
              titulo="Oportunidades"
              texto="Uma educação de qualidade pode ampliar oportunidades profissionais e sociais."
            />

            <Card
              titulo="Inclusão"
              texto="A educação deve proporcionar oportunidades para diferentes públicos."
            />
          </div>
        </section>

        <section id="dados" className="section">
          <h2>Dados sobre Educação</h2>

          <p>
            Os dados abaixo são carregados automaticamente de uma API externa
            do Banco Mundial.
          </p>

          {carregando && <p>Carregando dados...</p>}

          {erro && (
            <p>Não foi possível carregar os dados no momento.</p>
          )}

          {!carregando && !erro && dados.length > 0 && (
            <div className="cards">
              {dados
                .filter((item) => item.value !== null)
                .slice(0, 5)
                .map((item) => (
                  <Card
                    key={item.date}
                    titulo={`Ano: ${item.date}`}
                    texto={`Matrícula escolar no ensino secundário: ${item.value.toFixed(
                      2
                    )}%`}
                  />
                ))}
            </div>
          )}
        </section>

        <section id="metas" className="section">
          <h2>Metas do ODS 4</h2>

          <ul>
            <li>Garantir educação básica de qualidade.</li>
            <li>Ampliar o acesso à educação.</li>
            <li>Promover oportunidades de aprendizagem.</li>
            <li>Reduzir desigualdades no acesso à educação.</li>
            <li>Valorizar professores e profissionais da educação.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;