import React, { useState } from 'react';
import { Box } from "@chakra-ui/react";

import MapBox from "@/components/Map/MapBox";

export default function AboutTrip() {
    const [ locationData, setLocationData ] = useState<number[][]>([
        [36.1460625, 128.3934375],
        [36.1284582, 128.3307228]
    ]);


    return (
        <Box>
            <MapBox locationData={locationData} />
        </Box>
    );
}