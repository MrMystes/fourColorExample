<template>
    <div id="app">
        <div id="map"></div>
    </div>
</template>

<script>
import coordinates from "./assets/coordinates.json";
import { calcReleations } from "./utils/fourColorCalculate";
console.log(coordinates);
export default {
    name: "App",
    components: {},
    mounted() {
        window.mapboxgl.accessToken =
            "pk.eyJ1IjoibXlzdGVzMDciLCJhIjoiY2tjaHF1MzZoMHljMTJybnFzOTl1ZTI5byJ9.BedxcCR4az66JS8V-a0qjQ";
        this.map = new window.mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [120.31, 31.69], // starting position [lng, lat]
            zoom: 13
        });

        this.map.on("load", () => {
            const answer = calcReleations(coordinates);
            const colors = ["#eb4b3e", "#46af0e", "#e09010", "#395fdc"];
            const features = coordinates.map((coordinate, index) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: coordinate
                    },
                    properties: {
                        "fill-color": colors[answer[index] - 1]
                            ? colors[answer[index] - 1]
                            : "#000",
                        "fill-opacity": 0.6
                    }
                };
            });
            console.log("features", features);
            this.map.addLayer({
                id: "maine",
                type: "fill",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features
                    }
                },
                paint: {
                    "fill-opacity": 0.6,
                    // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
                    // to set the line-color to a feature property value.
                    "fill-color": ["get", "fill-color"]
                }
            });
        });
    }
};
</script>

<style style="scss">
#app {
    width: 100vw;
    height: 100vh;
}
#map {
    width: 100%;
    height: 100%;
}
</style>