import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!query) return;
    setLoading(true);
    setResult('AI가 추천 중입니다...');

    const response = await fetch('/api/ask-free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    setResult(data.reply);
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

      {result && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 20, border: '1px solid #ddd', padding: 10 }}>
          {result}
        </div>
      )}
    </div>
  );
}
