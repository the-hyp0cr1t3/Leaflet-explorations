import React, { useState } from "react";

import { Map, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Basic Openstreet Maps</h2>
                    <div className="col">
                        <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                        </Map>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicMap;