import { useState, useEffect } from "react";
import { Map, Polyline, useKakaoLoader } from "react-kakao-maps-sdk"
import axios from "axios";
import { useQuery } from '@tanstack/react-query'

interface Coordinate {
  lat: number;
  lng: number;
}


interface origin {
  x: number;
  y: number;
  angle: number;
}

interface destination {
  x: number;
  y: number;
}

interface waypoints {
  name: string;
  x: number;
  y: number;
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
  return response.data;
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
          x: locationData[0][0],
          y: locationData[0][1],
          angle: 0,
        },
        destination: {
          x: locationData[locationData.length - 1][0],
          y: locationData[locationData.length - 1][1],
        },
        waypoints: locationData.slice(1, -1).map((loc, index) => ({
          name: `Waypoint ${index + 1}`,
          x: loc[0],
          y: loc[1],
        })),
        priority: "fastest",
        car_fuel: "gasoline",
        car_hipass: false,
        alternatives: false,
        road_details: false,
        summary: true,
      });

      refetchRouteData();
      // setPath(locationData.map((loc) => ({ lat: loc[0], lng: loc[1] })))
    }
  }, [ locationData, refetchRouteData ]);

  useEffect(() => {
    console.log("results", results);
  }, [ results ]);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "600px",
        height: "350px",
      }}
      level={3} // 지도의 확대 레벨
    >
      <Polyline
        path={[
          path
        ]}
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={"#FFAE00"} // 선의 색깔입니다
        strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
      />
    </Map>
  );
}