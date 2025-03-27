export default async function handler(req, res) {
  const { query } = req.body;

  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: query
    })
  });

  const data = await response.json();
  const reply = data[0]?.generated_text || 'AI가 답변을 생성하지 못했습니다.';

  res.status(200).json({ reply });
}
