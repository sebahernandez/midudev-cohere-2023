const COHERE_API_KEY = '5QNpVdL3vCEn2hsGtXShiphIBAuyEtn2ThYUIfgb';
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';
const COHERE_API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language'

export async function checkIsLenguaje(input) {
  const data = {
    texts: [input]
  }

  const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  const [{ language_code }] = results
  return language_code === 'en'
}


export  async function getAnswer(input) {
  const data = {
    model: 'command-xlarge-20221108',
    prompt: `generates a meal idea with the ingredient ${input}`,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  }

  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  const { text } = response.generations[0]
  return text
    .replace('--', '')
    .replaceAll('"', '')
    .trim()

}