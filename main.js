// pobranie danych z json
var json = (function() {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "/data.json",
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
  })();

// zmienne - input i przycisk z DOM
let input = document.querySelector("input.litera");
let btn = document.querySelector("button.show");

// zmienne - litera jaką się wpisze i miasta z bazy na dana literę
let letter;
let cities; 

// event na kliknięcie w przycisk,
// przypisanie do zmiennej litery 
// wyszukanie miast na danę literę w bazie
// wywolanie funkcji updateMap()
btn.addEventListener('click', function() {
    letter = input.value.toUpperCase();
    cities = firstWord(letter)
    updateMap(cities);
})

// funkcja wyszukująca w bazie danych miasta na daną literę i wpisująca do tablicy
function firstWord(input) {
    let cities = []
    for(let i = 0; i<json.length; i++) {
        if(input==json[i].Miejscowosc[0]) {
            cities.push(json[i])
            
        }
    }
    return cities
}

// Google maps 
var map;

//funkcja tworząca mapę na start, wraz z zaladowaniem strony
function initMap() {
    // ustawienia mapy, środek, typ, zoom
    var centerMap = {lat: 52.2, lng: 20};
    var mapOptions = {
        center: centerMap,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// funkcja - ustawienie markerów na mapie 
function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map)
    }
}

// markery będa wpisywane do pustej tablicy
let markers = [];

// funkcja do updatowania mapy i ustawiania pinezek
function updateMap(cities) {

    // wyczyszczenie pinezek z mapy i tablicy markers
    setMarkers(null);
    markers = [];
    
    var marker;

    // pętla iterująca po miastach i tworzenie markerów, wpisanie do tablicy każdego z nch
    for(let i=0; i<cities.length; i++) {
        const city = cities[i]
        marker = new google.maps.Marker({
            position: {lat: parseFloat(city.Szerokosc), lng: parseFloat(city.Dlugosc)}
        })
        markers.push(marker)
        // marker.setMap(map)
    }

    //ustawienie markerów na mapie
    setMarkers(map);

}
