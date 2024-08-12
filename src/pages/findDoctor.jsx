import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import axios from "axios";

const FindDoctor = () => {
    const mapElement = useRef(null);
    const [map, setMap] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState([4.899, 52.372]); 
    const [locationInput, setLocationInput] = useState("");


    const [alert, setAlert] = useState({ show: false, message: "", isSuccess: true });


    const closeAlert = () => {
        setAlert({ ...alert, show: false });
    };

    useEffect(() => {
        
        const mapInstance = tt.map({
            key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
            container: mapElement.current,
            center: center,
            zoom: 14,
        });

        setMap(mapInstance);

       
        mapInstance.on('click', (event) => {
            const { lngLat } = event;
            setCenter([lngLat.lng, lngLat.lat]);
        });

        
        return () => mapInstance.remove();
    }, []);

    useEffect(() => {
        
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCenter([longitude, latitude]);
                        map.setCenter([longitude, latitude]);
                        map.setZoom(14); 
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        
                        setCenter([4.899, 52.372]); 
                    },
                    {
                        enableHighAccuracy: true, 
                        timeout: 10000, 
                        maximumAge: 0, 
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                
                setCenter([4.899, 52.372]); 
            }
        };

        if (map) {
            getCurrentLocation();
        }
    }, [map]);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (map) {
                try {
                    const response = await axios.get(`https://api.tomtom.com/search/2/poiSearch/doctor.json?categorySet=9663,7321,9373`, {
                        params: {
                            key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
                            lat: center[1],
                            lon: center[0],
                            radius: 50000, 
                        },
                    });
                    setDoctors(response.data.results);
                } catch (error) {
                    console.error("Error fetching POIs:", error);
                }
            }
        };

        fetchDoctors();
    }, [map, center]);

    useEffect(() => {
        if (map && doctors.length > 0) {
            
            markers.forEach(marker => marker.remove());

            
            const newMarkers = doctors.map(doctor => {
                const marker = new tt.Marker()
                    .setLngLat([doctor.position.lon, doctor.position.lat])
                    .addTo(map);

            //     marker.getElement().addEventListener('click', () => {
            //         alert(`Doctor: ${doctor.poi.name}\nSpecialty: ${doctor.poi.categories.join(', ')}`);

            //     });

            //     return marker;
            // });


            marker.getElement().addEventListener('click', () => {
                setAlert({
                    show: true,
                    message: `Doctor: ${doctor.poi.name}<br>Specialty: ${doctor.poi.categories.join(', ')}`,
                    isSuccess: true,
                });
            });
            
            return marker;
         });

            setMarkers(newMarkers);
        }
    }, [doctors, map]);

    const handleLocationInputChange = (e) => {
        setLocationInput(e.target.value);
    };

    const handleLocationSubmit = async () => {
        if (locationInput) {
            try {
                const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${locationInput}.json`, {
                    params: {
                        key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
                    },
                });
                const { lat, lon } = response.data.results[0].position;
                setCenter([lon, lat]);
                map.setCenter([lon, lat]);
            } catch (error) {
                console.error("Error geocoding location:", error);
            }
        }
    };

    return (
        <>

        <div style={{ padding: "10px", backgroundColor: "#fff" }}>
            <input
                type="text"
                value={locationInput}
                onChange={handleLocationInputChange}
                placeholder="Enter a location"
            />
            <button onClick={handleLocationSubmit}>Go</button>
        </div>
        <div ref={mapElement} style={{ width: "100vw", height: "100vh" }} />
        
        {alert.show && (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: alert.isSuccess ? 'green' : 'red',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                zIndex: 1000,
            }}>
                <div dangerouslySetInnerHTML={{ __html: alert.message }} />
                <button
                    onClick={closeAlert}
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    OK
                </button>
            </div>
        )}

        </>
    );
};

export default FindDoctor;



