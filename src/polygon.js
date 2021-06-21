import React, { useEffect, useState } from "react";

import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { PlottyGeotiffLayer, VectorArrowsGeotiffLayer } from "./GeotiffLayer";

const PolygonMap = () => {
  // const [center, setCenter] = useState({ lat: 21.00247105435674, lng: 88.02250310615936 });
  const [center, setCenter] = useState({ lat: 27.171582284054917, lng: 73.81164550781251 });
  const [mapLayers, setMapLayers] = useState([]);
  const [geojsonobj, setGeojsonobj] = useState();

  const ZOOM_LEVEL = 7;
  const mapRef = useRef();


  useEffect(() => {
    var collection = {
      "type": "FeatureCollection",
      "features": [

      ]
    }

    mapLayers.map(layer => {
      var tmp = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": layer.layerType,
          "coordinates": [

          ]
        }
      };


      var lst = []
      layer.latlngs.forEach(element => {
        const { lat, lng } = element;
        lst.push([lng, lat]);
      });

      tmp.geometry.coordinates.push(lst);

      collection.features.push(tmp);
      console.log(collection);
    });
    console.log(collection);
    setGeojsonobj(collection);
  }, [mapLayers]);

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    // if (layerType === "polygon") {
    const { _leaflet_id } = layer;

    setMapLayers((layers) => [
      ...layers,
      { id: _leaflet_id, layerType, latlngs: layer.getLatLngs()[0] },
    ]);
    // }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  // const windSpeedUrl = "https://stuartmatthews.github.io/leaflet-geotiff/tif/wind_speed.tif";
  // const windSpeedUrl = "https://drive.google.com/file/d/1YLN1g2zbwqUMvjax7i3z9SCUKVBSDBzJ/view?usp=sharing";
  // const windSpeedUrl = "https://app.treehealth.care/Web/wind_speed.tif";

  // const windSpeedUrl = "https://drive.google.com/file/d/1a_ZWHE0BAWI4k4jLDDzCaXKUN6mjMoc9/view?usp=sharing";
  const windSpeedUrl = "https://app.treehealth.care/Web/sample_tiff.tif";
  // const windSpeedUrl = "./MOS_CZ_KR_250.tif";
  const windSpeedOptions = {
    band: 0,
    bounds: [[27.171582284054917, 73.81164550781251], [30.642638258763288, 79.49707031250001]],
    // bounds: [[21.00247105435674, 88.02250310615936], [17.84283252904803, 92.1313154330292]],
    displayMin: 0,
    displayMax: 30,
    name: "Wind speed",
    colorScale: "rainbow",
    // colorScale: "greys",
    clampLow: false,
    clampHigh: true
    //vector:true
  };

  const imageId = '24052477'
  const apiKey = 'd32b8e8c9fd053981366d517ad2a7cd99441d596ae32dc370bf5f694b6f7f8e5';
  const bandsFormula = 'b04,b03,b02';
  const imageTilesURL = `https://api.spectator.earth/imagery/${imageId}/tiles/{z}/{x}/{y}/?bands_formula=${bandsFormula}&api_key=${apiKey}`;

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Create, edit and delete polygon on map</h2>

          <div className="col">
            <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={_onCreate}
                  onEdited={_onEdited}
                  onDeleted={_onDeleted}
                  draw={{
                    // rectangle: false,
                    // polyline: false,
                    // circle: false,
                    // circlemarker: false,
                    // marker: false,
                  }}
                />
              </FeatureGroup>

              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <TileLayer
                url={imageTilesURL}
                attribution={osm.maptiler.attribution}
              />
              <PlottyGeotiffLayer
                layerRef={mapRef}
                url={windSpeedUrl}
                options={windSpeedOptions}
              />

            </Map>

            <h6 align='left'>
              {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}
              <pre className="text-left">{JSON.stringify(geojsonobj, 0, 2)}</pre>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolygonMap;