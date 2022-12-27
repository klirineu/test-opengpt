import { useState } from 'react'
import api from './services/apiGpt'
import { GlobalStyle } from './styles/global'

export function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [resultImage, setResultImage] = useState<{ url: string }[]>([])
  const apiKey = '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'

  const Auth = `Bearer ${apiKey}`

  async function handleClick() {
    const teste = await api.post(
      '/completions',
      {
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 20
      },
      { headers: { Authorization: Auth } }
    )
    console.log(teste.data)
    setResult(teste.data.choices[0].text)
  }

  async function handleClickImage() {
    const teste = await api.post(
      '/images/generations',
      {
        prompt,
        n: 2,
        size: '256x256',
        response_format: 'url'
      },
      { headers: { Authorization: Auth } }
    )
    console.log(teste.data)
    setResultImage(teste.data.data)
    console.log(resultImage)
  }

  return (
    <div style={{ padding: 20 }} className="App">
      <h1>Teste OpenGPT</h1>
      <input type="text" onChange={e => setPrompt(e.target.value)} />
      <button onClick={handleClickImage}>enviar</button>
      <h1>{result}</h1>
      {resultImage.map(image => (
        <img style={{ margin: 20 }} key={image.url} src={image.url} alt="" />
      ))}
      <GlobalStyle />
    </div>
  )
}
