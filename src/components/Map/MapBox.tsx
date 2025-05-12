import { useState, useEffect } from "react";
import { Map, Polyline, useKakaoLoader } from "react-kakao-maps-sdk"
import axios from "axios";
import { useQuery } from '@tanstack/react-query'

interface Coordinate {
  lat: number;
  lng: number;
}

interface origin {
  x: string;
  y: string;
  angle: number;
}

interface destination {
  x: string;
  y: string;
}

interface waypoints {
  name: string;
  x: string;
  y: string;
}

interface MobilityQuery {
  origin: origin,
  destination: destination,
  waypoints: waypoints[],
  priority: string,
  car_fuel: string,
  car_hipass: boolean,
  alternatives: boolean,
  road_details: boolean,
  summary: boolean,
}

const fetchRouteData = async (loc_data: MobilityQuery) => {
  // 리엑트쿼리 post
  const header = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `KakaoAK aca67f7366d77ae20257384b7de569bf`,
    }
  }

  const response = await axios.post(`https://apis-navi.kakaomobility.com/v1/waypoints/directions`, loc_data, header);
  return response.data.routes[0].sections;
};

export default function MapBox({ locationData }: { locationData: number[][] }) {
  const [ loading, error ] = useKakaoLoader(
    {
      appkey: "e55ce2f428ca6e286c849083454b41cf"
    }
  )
  const [ reqQuery, setReqQuery ] = useState<MobilityQuery>()

  const { data: results = [], isLoading: isLoading, error: routeError, refetch: refetchRouteData } = useQuery({
    queryKey: ['query', reqQuery],
    queryFn: () => reqQuery ? fetchRouteData(reqQuery) : Promise.reject("reqQuery is undefined"),
    enabled: true,
  });
  
  const [ path, setPath ] = useState<Array<Coordinate>>([])

  useEffect(() => {
    if (locationData.length > 0) {
      // 카카오 모빌리티에서 가져오기
      setReqQuery({
        origin: {
          x: String(locationData[0][1]),
          y: String(locationData[0][0]),
          angle: 270,
        },
        destination: {
          x: String(locationData[locationData.length - 1][1]),
          y: String(locationData[locationData.length - 1][0]),
        },
        waypoints: locationData.slice(1, -1).map((loc, index) => ({
          name: `Waypoint ${index + 1}`,
          x: String(loc[1]),
          y: String(loc[0]),
        })),
        priority: "RECOMMEND",
        car_fuel: "GASOLINE",
        car_hipass: false,
        alternatives: false,
        road_details: false,
        summary: false,
      });

      refetchRouteData();
    }
  }, [ locationData, refetchRouteData ]);

  useEffect(() => {
    if (results) {
      const linepath: Array<Coordinate> = []
      for (const section of results) {
        for (const road of section.roads) {
          for (let i = 0; i < road.vertexes.length; i++) {
            if (i % 2 === 0) {
              linepath.push({
                lat: road.vertexes[i + 1],
                lng: road.vertexes[i],
              });
            }
          }
        }
      }
      setPath(linepath);
    }
  }, [ results ]);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 36.1460625,
        lng: 128.3934375,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={3} // 지도의 확대 레벨
    >
      <Polyline
        path={[
          path
        ]}
        strokeWeight={4} // 선의 두께 입니다
        strokeColor={"red"} // 선의 색깔입니다
        strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
      />
    </Map>
  );
}