var map;
var polygonPerim = [];
var rectangle = [];
// Puntos cardinales convertidos a angulos
var cardinalPoints = {
    north: 0,
    east: 90,
    south: 180,
    west: 270
}

const HEIGHT = 20;
const CAMERA_TAKE = {
    heigth: 60,
    width: 100
}

var RECTANGLE_DIMENTIONS = {
    heigth: 0,
    width: 0
}

// Función de inicialización del mapa
function initMap() {
    // Configuración inicial del mapa, almacenado en una variable global
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 24.018495, lng: -104.5480484 },
        zoom: 16,
        mapTypeId: 'satellite'
    });

    // Herramientas de dibujo de google maps, se da de alta las opciones de dichas herramientas
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            //He
            drawingModes: [ 'polyline', 'polygon']
        },
    });
    drawingManager.setMap(map);

    // Evento de terminar el poligono, al terminar imprime la distancia en kilometros y millas del perimetro
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (poly) {
        var polygon = [];
        poly.getPath().forEach(pos => {
            var point = new LatLng(pos.lat(), pos.lng())
            polygonPerim.push(objectToJSON(point));
            polygon.push(point);
        });

        let polygon_area = {
            mts: MapsLib.areaOf(polygon).toFixed(3),
            hect: (MapsLib.areaOf(polygon) / 10000).toFixed(3)
        }

        console.log(polygonPerim);
        console.log(MapsLib.distanceOfRoute(polygonPerim));
        console.log("Area of polygon: " +polygon_area.mts + " mts2");
        console.log("Area of polygon: " + polygon_area.hect + " hectareas");

        document.getElementById("result_area").innerText = "Area del terreno: " + polygon_area.hect + " hectareas";
    });

    // Evento de terminar la polilinea, al terminar imprime la distancia en kilometros y millas
    google.maps.event.addListener(drawingManager, 'polylinecomplete', function (poly) {
        var polyLine = [];
        poly.getPath().forEach(pos => {
            polyLine.push({ lat: pos.lat(), lng: pos.lng() })
        });
        console.log(MapsLib.distanceOfRoute(polyLine));
    });


}



