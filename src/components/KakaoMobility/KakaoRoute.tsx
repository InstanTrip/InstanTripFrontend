import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import axios from 'axios';


declare global {
    interface Window {
      kakao: any;
    }
}
  
interface Coordinate {
    lat: number;
    lng: number;
}

const fetchRouteData = async (loc_data: string) => {
  if (!loc_data?.trim()) return [];

  const header = {
    headers: {
      Authorization: `KakaoAK aca67f7366d77ae20257384b7de569bf`,
    }
  }

  const response = await axios.get(`https://apis-navi.kakaomobility.com/v1/waypoints/directions`, loc_data, header);
  return response.data;
};

const KakaoRoute = () => {
    const [routeCoords, setRouteCoords] = useState<Coordinate[] | null>(null);
  
    // 좌표 가져오기
    useEffect(() => {
      const fetchRoute = async () => {
        try {
          const response = await fetch("https://");


          const data = await response.json();
          setRouteCoords(data.route); // 서버에서 받은 좌표 데이터 설정    
        } catch (err) {
          console.error("좌표 가져오기 실패:", err);
        }
      };
  
      fetchRoute();
    }, []);
  
    // 경로 그리기
    useEffect(() => {
      if (routeCoords&& window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('routeMap');
          const centerCoord = routeCoords[0]; // 시작점 좌표로 설정하는건데 굳이 흠
          
          const mapOption = {
            center: new window.kakao.maps.LatLng(centerCoord.lat, centerCoord.lng),
            level: 5,
          };
  
          const map = new window.kakao.maps.Map(mapContainer, mapOption)
  
          // 마커 추가 (시작점, 끝점)
          new window.kakao.maps.Marker({ 
            map, 
            position: new window.kakao.maps.Lating(routeCoords[0].lat, routeCoords[0].lng),
            title: '출발지'
          });
          new window.kakao.maps.Marker({ 
            map, 
            position: new window.kakao.maps.Lating(routeCoords[routeCoords.length - 1].lat, routeCoords[routeCoords.length - 1].lng),
            title: '도착지' 
          });

          const linePath = routeCoords.map(coord => new window.kakao.maps.LatLng(coord.lat, coord.lng));
  
          const polyline = new window.kakao.maps.Polyline({
            map: map,
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
          });
  
          // 전체 경로가 잘 보이도록 바운더리 설정
          const bounds = new window.kakao.maps.LatLngBounds();
          linePath.forEach(latling => bounds.extend(latling));
          map.setBounds(bounds);
        });
      }
    }, [routeCoords]);
  
    return (
      <div id="routeMap" style={{ width: '100%', height: '500px' }}></div>
    );
  };
  
export default KakaoRoute;