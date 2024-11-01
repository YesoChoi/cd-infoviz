import dynamic from 'next/dynamic';

// Mapbox GL JS는 브라우저 환경에서만 작동하므로, 
// dynamic import와 ssr: false 옵션을 사용하여 클라이언트 사이드에서만 렌더링
const Main = dynamic(() => import('../../../components/map/v2'), {
    ssr: false
});

export default function MapV2() {
    return <Main />;
}