import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import s from './Map.module.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY29uc3RhdCIsImEiOiJjbDV4dW1uMW0wMXBhM2RvOThuemswbXd2In0.bun1EO46QgaaCWmy6_mNYg';

const Map = ({ x, y }) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [x, y],
      zoom: 10,
    });

    map.on('load', function () {
      // Add an image to use as a custom marker
      map.loadImage('./images/icon-location.png', function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        // Add a GeoJSON source with multiple points

        new mapboxgl.Marker().setLngLat([x, y]).addTo(map);
        // Add a symbol layer
      });
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Clean up on unmount
    return () => map.remove();
  }, [x, y]);
  return (
    <>
      <div className={s.map} ref={mapContainerRef} />
    </>
  );
};

export default Map;
