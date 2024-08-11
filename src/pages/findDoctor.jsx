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

                marker.getElement().addEventListener('click', () => {
                    alert(`Doctor: ${doctor.poi.name}\nSpecialty: ${doctor.poi.categories.join(', ')}`);
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
        </>
    );
};

export default FindDoctor;



/* import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const FindDoctor = () => {
    const mapElement = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [query, setQuery] = useState('doctor');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const mapInstance = tt.map({
            key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
            container: mapElement.current,
            center: [0, 0], // Default center, will be updated later
            zoom: 12,
        });

        setMap(mapInstance);

        const updateLocationAndFetchData = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    mapInstance.setCenter([longitude, latitude]);

                    fetchDoctorsNearLocation(longitude, latitude);

                    mapInstance.on('moveend', () => {
                        const bounds = mapInstance.getBounds();
                        const { _ne, _sw } = bounds;

                        if (_ne && _sw) {
                            fetchDoctorsInBounds(_ne.lng, _ne.lat, _sw.lng, _sw.lat);
                        } else {
                            console.error("Error: Map bounds are undefined.");
                        }
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        };

        updateLocationAndFetchData();

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    const fetchDoctorsNearLocation = (lon, lat) => {
        if (!map) return;

        axios.get('https://api.tomtom.com/search/2/nearbySearch/.json?categorySet=9663,7321,9373', {
            params: {
                key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
                lat: lat,
                lon: lon,
                radius: 5000,
            }
        })
        .then(response => {
            console.log("Doctors near location:", response.data.results);
            updateMarkers(response.data.results);
        })
        .catch(error => {
            console.error("There was an error fetching the doctors near location:", error);
        });
    };

    const fetchDoctorsInBounds = (neLon, neLat, swLon, swLat) => {
        if (!map) return;

        axios.get(`https://api.tomtom.com/search/2/poiSearch/${query}.json`, {
            params: {
                key: import.meta.env.VITE_APP_TOMTOM_API_KEY,
                lat: (neLat + swLat) / 2,
                lon: (neLon + swLon) / 2,
                radius: 5000,
            }
        })
        .then(response => {
            console.log("Doctors in bounds:", response.data.results);
            updateMarkers(response.data.results);
        })
        .catch(error => {
            console.error("There was an error fetching the doctors in bounds:", error);
        });
    };

    const updateMarkers = (doctors) => {
        if (!map) {
            console.error("Map instance is not initialized.");
            return;
        }

        markers.forEach(marker => marker.remove());

        const newMarkers = doctors
            .filter(doctor => doctor.position && 
                              typeof doctor.position.lat === 'number' && 
                              typeof doctor.position.lon === 'number')
            .map(doctor => {
                const { lat, lon } = doctor.position;
                const name = doctor.poi.name || 'Unknown';
                const category = doctor.poi.categories[0] || 'Unknown';
                const coords = [lon, lat];
                const marker = new tt.Marker().setLngLat(coords).addTo(map);

                marker.getElement().addEventListener('click', () => {
                    alert(`Doctor: ${name}\nSpecialty: ${category}`);
                });

                return marker;
            });

        setMarkers(newMarkers);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={query}
                    placeholder="Search Here"
                    onChange={handleInputChange}
                />
                <button type="submit" onClick={() => fetchDoctorsNearLocation(map.getCenter().lng, map.getCenter().lat)}>
                    Search
                </button>
            </div>
            <div ref={mapElement} style={{ width: "100vw", height: "100vh" }} />
        </>
    );
};

export default FindDoctor;
 */