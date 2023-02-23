import { geoCentroid } from "d3-geo";
import {
  Annotation, ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import topoBrJson from "../data/topo-br.json";
import { getWeatherByLatLong, startFetching } from "../reducers/weather.slice";
import { useAppDispatch } from "../store/hooks";
import { MAP_ANNOTATION_COLOR, MAP_BORDER_COLOR, MAP_COLOR, MAP_HOVER_COLOR, MAP_PRESS_COLOR } from "../utils/colors";
import { GeoType } from "./mapChart.model";

// Estados c/ legenda deslocada
const statesWithAnnotations = {
  BR_DF: {
    annotation: { x: -10, y: -16 },
    tag: { fontSize: 14, x: -8, y: -6 }
  },
  BR_RN: {
    annotation: { x: 28, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_PB: {
    annotation: { x: 32, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_PE: {
    annotation: { x: 50, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_AL: {
    annotation: { x: 30, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_SE: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_ES: {
    annotation: { x: 20, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_RJ: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  }
};

//style do mapa
const geographyStyle = {
  fill: MAP_COLOR,
  stroke: MAP_BORDER_COLOR,
  strokeWidth: 0.5,
  outline: "none",
  cursor: "pointer",
  transition: "all .2s"
};

const MapChart = () => {
  const dispatch = useAppDispatch();

  const handleClick = (geo: GeoType) => {
    if(geo.properties) {
      const { latitude, longitude, name } = geo.properties;
      dispatch(startFetching())
      dispatch(getWeatherByLatLong({
        name: name,
        lat: latitude, 
        lon: longitude
      }));
    }
  }  

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 800,
        center: [-54, -15]
      }}
      width={600}
      height={600}
    >
      <Geographies geography={topoBrJson}>
        {({ geographies }) => (
          <>
            {/* tipo do mapa, rederiza um array dos estados */} 
            {geographies.map((geo) => <Geography
                  key={geo.rsmKey + "-Geography"}
                  geography={geo}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      ...geographyStyle,
                    },
                    hover: {
                      ...geographyStyle,
                      fill: MAP_HOVER_COLOR
                    },
                    pressed: {
                      ...geographyStyle,
                      fill: MAP_PRESS_COLOR
                    }
                  }}
                />
            )}

            {/* renderiza a legenda, com ou sem anotacao, legenda deslocada */}  
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const geoId = geo.properties.id;
              const countryIndentifier = `BR_${geoId}` as keyof typeof statesWithAnnotations
              const annotationOffset = statesWithAnnotations[countryIndentifier];
              const tagPosition = annotationOffset?.tag || {
                x: 2,
                y: 0,
                fontSize: 12
              };
              
              return (
                <g
                  key={`${geo.rsmKey}-Marker`}
                  style={{ pointerEvents: "none" }}
                >
                {/* condicao do tipo de anotacao */}
                  {annotationOffset ? (
                    <Annotation
                      connectorProps={{
                        stroke: MAP_ANNOTATION_COLOR
                      }}
                      subject={centroid}
                      dx={annotationOffset.annotation.x}
                      dy={annotationOffset.annotation.y}
                    >
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        fontSize={tagPosition.fontSize}
                        alignmentBaseline="middle"
                      >
                        {geoId}
                      </text>
                    </Annotation>
                  ) : (
                    <Marker coordinates={centroid}>
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        fontSize={tagPosition.fontSize}
                        textAnchor="middle"
                      >
                        {geoId}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
