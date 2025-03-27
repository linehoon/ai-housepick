import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!query) return;
    setLoading(true);
    setResult('<div class="loader">추천 중입니다...</div>');

    const response = await fetch('/api/ask-free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    const cleanText = data.reply.trim().replace(/^\n+/, '').replace(/\n{3,}/g, '\n\n');
    setResult(cleanText);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h1>🏡 AI 하우스픽</h1>
      <p>단독주택 살이에 필요한 물건을 AI가 추천해드려요!</p>

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
