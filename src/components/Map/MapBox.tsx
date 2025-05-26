import { useState, useEffect } from "react";
import { Map, Polyline, MapMarker , useKakaoLoader } from "react-kakao-maps-sdk"
import axios from "axios";
import { useQuery } from '@tanstack/react-query'

import pin1 from "@/assets/pin1.svg";
import pin2 from "@/assets/pin2.svg";
import pin3 from "@/assets/pin3.svg";
import pin4 from "@/assets/pin4.svg";
import pin5 from "@/assets/pin5.svg";
import pin6 from "@/assets/pin6.svg";
import pin7 from "@/assets/pin7.svg";
import pin8 from "@/assets/pin8.svg";
import pin9 from "@/assets/pin9.svg";
import pin10 from "@/assets/pin10.svg";
import homePin from "@/assets/home_pin.svg";

const pins = [
    pin1,
    pin2,
    pin3,
    pin4,
    pin5,
    pin6,
    pin7,
    pin8,
    pin9,
    pin10,
];

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
    return response.data;
};

export default function MapBox({ locationData, dateIndex, openLocDetailModal }: { locationData: number[][], dateIndex: number, openLocDetailModal: (index: number) => void }) {
    const [ loading, error ] = useKakaoLoader(
        {
            appkey: "e55ce2f428ca6e286c849083454b41cf"
        }
    )
    const [ reqQuery, setReqQuery ] = useState<MobilityQuery>();

    const { data: results, isLoading: isLoading, error: routeError, refetch: refetchRouteData } = useQuery({
        queryKey: ['query', reqQuery],
        queryFn: () => reqQuery ? fetchRouteData(reqQuery) : [],
        enabled: !!reqQuery,
    });
  
    const [ path, setPath ] = useState<Array<Coordinate>>([])

    useEffect(() => {
        if (locationData.length > 0) {
            // 카카오 모빌리티에서 가져오기
            setReqQuery(
                {
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
                    car_hipass: true,
                    alternatives: true,
                    road_details: false,
                    summary: false,
                }
            );
        }
    }, [ locationData ]);

    useEffect(() => {
        if (reqQuery) {
            refetchRouteData();
        }
    }, [ reqQuery, refetchRouteData ]);

    useEffect(() => {
        if (results) {
            const linepath: Array<Coordinate> = []
            if (results.routes[0].result_code != 0) {
                // 카카오 모빌리티에서 값을 가져오지 못한 경우 단순 좌표값 이어 그리기
                for (let loc of locationData) {
                    linepath.push({
                        lat: loc[0],
                        lng: loc[1],
                    });
                }
                setPath(linepath);
                return;
            }
            if (results.routes[0].sections && results.routes[0].sections.length > 0) {
                console.log("results", results);
                for (const section of results.routes[0].sections) {
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
        }
    }, [ results ]);

    return (
        <Map // 지도를 표시할 Container
        id="map"
        center={{
            // 지도의 중심좌표
            lat: locationData[0][0],
            lng: locationData[0][1]
        }}
        style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
            zIndex: 0,
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

            {
                locationData.map((loc, index) => (
                    <>
                        {
                            locationData.length > 7 && index === 0 ? (
                                <MapMarker
                                    key={index}
                                    position={{
                                        lat: loc[0],
                                        lng: loc[1]
                                    }}
                                    image={{
                                        src: dateIndex === 0 ?
                                                pins[index] :
                                                    index === 0 ?
                                                        homePin : pins[index - 1],
                                        size: {
                                            width: 50,
                                            height: 50
                                        }
                                    }}
                                />
                            ) : (
                                <MapMarker
                                    key={index}
                                    position={{
                                        lat: loc[0],
                                        lng: loc[1]
                                    }}
                                    image={{
                                        src: dateIndex === 0 ?
                                                pins[index] :
                                                    index === 0 ?
                                                        homePin : pins[index - 1],
                                        size: {
                                            width: 50,
                                            height: 50
                                        }
                                    }}
                                    
                                    clickable={true}
                                    onClick={() => openLocDetailModal(
                                        locationData.length > 7 ? index - 1 : index
                                    )}
                                />
                            )
                        }
                    </>
                ))
            }
        </Map>
    );
}