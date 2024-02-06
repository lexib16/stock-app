import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import markerIcon from '../assets/MARKER.png'
import { Card, CardHeader, CardMedia } from '@mui/material'
import { useSelector } from 'react-redux'

const MapView = ({ lat, lng }) => {
  const firms = useSelector((state) => state.firms.data)

  return (
    <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[lat, lng]}
        icon={new Icon({ iconUrl: markerIcon, iconSize: [50, 50] })}
      >
        <Popup>
          <Card>
            <CardHeader
              title={firms[0].name}
              sx={{ color: 'dodgerblue', textAlign: 'center' }}
            />
            <CardMedia
              component="img"
              src={firms[0].image}
              height="50"
              title={firms[0].name}
              alt={firms[0].name}
              sx={{ objectFit: 'cover', p: 2 }}
            />
          </Card>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView