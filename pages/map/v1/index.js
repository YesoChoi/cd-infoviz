import MapScene from '../../../components/map/v1'

const mapUrl = '/texture/map_outline.png' // 실제 지도 이미지 경로로 변경해주세요

const V3Page = () => {
  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <MapScene mapUrl={mapUrl} />

    </div>
  )
}

export default V3Page