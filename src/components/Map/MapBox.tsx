import { useEffect } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk"
// import useKakaoLoader from "./useKakaoLoader"


export default function MapBox() {
  const [ loading, error ] = useKakaoLoader(
    {
      appkey: "e55ce2f428ca6e286c849083454b41cf"
    }
  )

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
    />
  );
}