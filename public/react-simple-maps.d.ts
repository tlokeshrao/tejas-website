declare module "react-simple-maps" {
  import { ReactNode, CSSProperties, SVGAttributes, MouseEvent } from "react";

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  interface Geography {
    rsmKey: string;
    [key: string]: unknown;
  }

  interface GeographyProps extends SVGAttributes<SVGPathElement> {
    geography: Geography;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
  }

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export const ComposableMap: (props: ComposableMapProps) => JSX.Element;
  export const Geographies: (props: GeographiesProps) => JSX.Element;
  export const Geography: (props: GeographyProps) => JSX.Element;
  export const Marker: (props: MarkerProps) => JSX.Element;
}
