import IcoMoon from "react-icomoon";
import icoMoonConfig from "../../assets/selection.json";



export function Icon({ name, size = 24, color = "black" }: any) {
  return <IcoMoon iconSet={icoMoonConfig} icon={name} size={size} color={color} />;
}
