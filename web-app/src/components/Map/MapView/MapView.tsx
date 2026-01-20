import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Report, ReportStatus } from '../../../types';
import 'leaflet/dist/leaflet.css';
import '../../../assets/styles/components/MapView.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons based on status
const createCustomIcon = (status: ReportStatus) => {
    const colors: Record<ReportStatus, string> = {
        new: '#ef4444',
        in_progress: '#f59e0b',
        completed: '#10b981',
    };

    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-pin" style="background-color: ${colors[status]}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                </svg>
            </div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42],
    });
};

const statusLabels: Record<ReportStatus, string> = {
    new: 'Nouveau',
    in_progress: 'En cours',
    completed: 'Terminé',
};

interface MapViewProps {
    reports: Report[];
    center?: [number, number];
    zoom?: number;
    onReportClick?: (report: Report) => void;
}

// Component to handle map centering
function MapController({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
}

export function MapView({
    reports,
    center = [-18.8792, 47.5079], // Antananarivo coordinates
    zoom = 13,
    onReportClick,
}: MapViewProps) {

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MG', {
            style: 'currency',
            currency: 'MGA',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="map-container">
            <MapContainer
                center={center}
                zoom={zoom}
                className="map"
                scrollWheelZoom={true}
            >
                {/* Serveur de cartes hors ligne */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | SignalRoute'
                    url="http://localhost:9080/styles/basic/{z}/{x}/{y}.png"
                />
                <MapController center={center} />

                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[report.latitude, report.longitude]}
                        icon={createCustomIcon(report.status)}
                        eventHandlers={{
                            click: () => {
                                onReportClick?.(report);
                            },
                        }}
                    >
                        <Popup className="report-popup">
                            <div className="popup-content">
                                <div className={`popup-status status-${report.status}`}>
                                    {statusLabels[report.status]}
                                </div>
                                <h3 className="popup-title">{report.title}</h3>
                                <p className="popup-description">{report.description}</p>
                                <div className="popup-details">
                                    <div className="popup-detail">
                                        <span className="detail-label">Date:</span>
                                        <span className="detail-value">{formatDate(report.createdAt)}</span>
                                    </div>
                                    <div className="popup-detail">
                                        <span className="detail-label">Surface:</span>
                                        <span className="detail-value">{report.surfaceArea} m²</span>
                                    </div>
                                    {report.budget && (
                                        <div className="popup-detail">
                                            <span className="detail-label">Budget:</span>
                                            <span className="detail-value">{formatCurrency(report.budget)}</span>
                                        </div>
                                    )}
                                    {report.company && (
                                        <div className="popup-detail">
                                            <span className="detail-label">Entreprise:</span>
                                            <span className="detail-value">{report.company}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Légende */}
            <div className="map-legend">
                <h4>Légende</h4>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                        <span>Nouveau</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                        <span>En cours</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
                        <span>Terminé</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
