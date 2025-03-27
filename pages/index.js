import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!query) return;
    setLoading(true);
    setResult('<div class="loader">추천 중입니다...</div>');

    const prompt = `당신은 단독주택 생활 전문가입니다. 사용자 질문에 따라 필요한 물건이나 설치 제품을 구체적으로 추천해주세요. 실생활에 도움이 되는 제품을 알려주세요.

질문: ${query}
답변:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}` // ← 여기에 본인의 OpenAI API 키 넣기
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'AI가 답변을 생성하지 못했습니다.';
    const cleanText = answer.trim().replace(/^\\n+/, '').replace(/\\n{3,}/g, '\\n\\n');
    setResult(cleanText);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h1>🏡 AI 하우스픽</h1>
      <p>단독주택 살이에 필요한 물건을 ChatGPT가 추천해드려요!</p>

      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="예: 마당에 조명을 설치하고 싶어요"
        style={{ width: '100%', padding: 10, marginTop: 10 }}
      />

      <button
        onClick={handleClick}
        style={{ marginTop: 10, padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? '추천 중...' : 'AI에게 물어보기'}
      </button>

      <div
        style={{ whiteSpace: 'pre-wrap', marginTop: 20, border: '1px solid #ddd', padding: 10 }}
        dangerouslySetInnerHTML={{ __html: result }}
      />

      <style jsx>{`
        .loader {
          display: inline-block;
          color: #555;
          font-weight: bold;
          position: relative;
        }
        .loader::after {
          content: '';
          display: inline-block;
          width: 1em;
          height: 1em;
          border: 2px solid #ccc;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          margin-left: 8px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
