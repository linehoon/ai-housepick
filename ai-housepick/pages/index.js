import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!query) return;
    setLoading(true);
    setResult('AI가 추천 중입니다...');

    setTimeout(() => {
      setResult(`✅ 마당에 필요한 용품 추천:
- 방수 콘센트 (야외 조명 설치용)
- 태양광 정원등
- 접이식 바비큐 테이블
- 데크용 방수 매트
- 외부 창고 수납장

🛒 쿠팡/오늘의집 등에서 확인해보세요!`);
      setLoading(false);
    }, 1500);
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
