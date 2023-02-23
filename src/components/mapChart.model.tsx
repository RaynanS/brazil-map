export type GeoType = {
  geometry: {
    type: string;
    coordinates: coordinate[];
  };
  properties: {
    adm0_sr: number;
    adm1_code: string;
    admin: string;
    code_local: string;
    diss_me: number;
    featurecla: string;
    gn_a1_code: string;
    hasc_maybe: string;
    id: string;
    iso_3166_2: string;
    iso_a2: string;
    latitude: number;
    longitude: number;
    min_zoom: number;
    name: string;
    name_alt: string;
    name_local: string;
    note: string;
    postal: string;
    sameascity: number;
    scalerank: number;
    type_en: string;
    wikipedia: string;
    woe_name: string;
  };
  rsmKey: string;
  svgPath: string;
  type: string;
}

type coordinate = number[]