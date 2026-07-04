import React, { useState, useEffect } from "react"
import "./styles.css"

const CIDADES = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília", "Curitiba", "Fortaleza", "Recife", "Porto Alegre", "Manaus"]

interface Clima { cidade: string; temp: number; condicao: string; umidade: number; vento: number; icone: string; previsao: { dia: string; tempMax: number; tempMin: number; icone: string }[] }

function gerarClima(cidade: string): Clima {
  const condicoes = ["Ensolarado", "Parcialmente Nublado", "Nublado", "Chuva Leve", "Tempestade", "Céu Limpo"]
  const icones = ["☀️", "⛅", "☁️", "🌦️", "⛈️", "🌙"]
  const c = Math.floor(Math.random() * condicoes.length)
  const tempBase = 28 + Math.floor(Math.random() * 10)
  return {
    cidade, icone: icones[c], condicao: condicoes[c],
    temp: tempBase, umidade: 40 + Math.floor(Math.random() * 40), vento: 5 + Math.floor(Math.random() * 25),
    previsao: Array.from({length: 7}, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i + 1)
      const pc = Math.floor(Math.random() * icones.length)
      return { dia: d.toLocaleDateString("pt-BR", {weekday: "short"}), tempMax: tempBase + Math.floor(Math.random() * 5) - 2, tempMin: tempBase - 5 - Math.floor(Math.random() * 5), icone: icones[pc] }
    })
  }
}

export default function App() {
  const [cidade, setCidade] = useState("São Paulo")
  const [clima, setClima] = useState<Clima>(gerarClima("São Paulo"))

  useEffect(() => { setClima(gerarClima(cidade)) }, [cidade])

  return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "header" },
      React.createElement("div", { className: "container header-inner" },
        React.createElement("h1", null, "🌤️ WeatherNow"),
        React.createElement("select", { value: cidade, onChange: (e: any) => setCidade(e.target.value), className: "city-select" },
          CIDADES.map(c => React.createElement("option", { key: c, value: c }, c))
        )
      )
    ),
    React.createElement("main", { className: "container" },
      React.createElement("div", { className: "current-weather" },
        React.createElement("div", { className: "weather-main" },
          React.createElement("span", { className: "weather-icon" }, clima.icone),
          React.createElement("span", { className: "weather-temp" }, `${clima.temp}°`),
          React.createElement("span", { className: "weather-cond" }, clima.condicao)
        ),
        React.createElement("div", { className: "weather-details" },
          React.createElement("div", { className: "detail" }, React.createElement("i", { className: "fa-solid fa-droplet" }), `${clima.umidade}%`),
          React.createElement("div", { className: "detail" }, React.createElement("i", { className: "fa-solid fa-wind" }), `${clima.vento} km/h`),
          React.createElement("div", { className: "detail" }, React.createElement("i", { className: "fa-solid fa-city" }), clima.cidade)
        )
      ),
      React.createElement("h2", { className: "forecast-title" }, "Previsão para 7 dias"),
      React.createElement("div", { className: "forecast-grid" },
        clima.previsao.map((p, i) => React.createElement("div", { key: i, className: "forecast-card" },
          React.createElement("span", { className: "forecast-day" }, p.dia),
          React.createElement("span", { className: "forecast-icon" }, p.icone),
          React.createElement("div", { className: "forecast-temps" },
            React.createElement("span", { className: "forecast-max" }, `${p.tempMax}°`),
            React.createElement("span", { className: "forecast-min" }, `${p.tempMin}°`)
          )
        ))
      )
    )
  )
}
