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

  // 응답 오류 검사: HTML 페이지가 오거나 API 오류 방지
  if (!response.ok) {
    const text = await response.text();
    console.error("💥 API 호출 실패:", response.status, text);
    return res.status(500).json({ reply: `AI 호출 실패 (${response.status})` });
  }

  const data = await response.json();
  const reply = data[0]?.generated_text || 'AI가 답변을 생성하지 못했습니다.';
  res.status(200).json({ reply });
}
