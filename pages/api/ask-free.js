export default async function handler(req, res) {
  const { query } = req.body;

  const response = await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct', {
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
  console.log("🤖 Hugging Face 응답:", data);

  const reply = data[0]?.generated_text || 'AI가 답변을 생성하지 못했습니다.';
  res.status(200).json({ reply });
}
