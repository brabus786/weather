export const wetherConfig = {
    // Group 2xx: Thunderstorm
    200: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with light rain', icon: '11d' },
    201: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with rain', icon: '11d' },
    202: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with heavy rain', icon: '11d' },
    210: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'light thunderstorm', icon: '11d' },
    211: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm', icon: '11d' },
    212: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'heavy thunderstorm', icon: '11d' },
    221: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'ragged thunderstorm', icon: '11d' },
    230: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with light drizzle', icon: '11d' },
    231: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with drizzle', icon: '11d' },
    232: { group: 'Thunderstorm', main: 'Thunderstorm', desc: 'thunderstorm with heavy drizzle', icon: '11d' },

    // Group 3xx: Drizzle
    300: { group: 'Drizzle', main: 'Drizzle', desc: 'light intensity drizzle', icon: '09d' },
    301: { group: 'Drizzle', main: 'Drizzle', desc: 'drizzle', icon: '09d' },
    302: { group: 'Drizzle', main: 'Drizzle', desc: 'heavy intensity drizzle', icon: '09d' },
    310: { group: 'Drizzle', main: 'Drizzle', desc: 'light intensity drizzle rain', icon: '09d' },
    311: { group: 'Drizzle', main: 'Drizzle', desc: 'drizzle rain', icon: '09d' },
    312: { group: 'Drizzle', main: 'Drizzle', desc: 'heavy intensity drizzle rain', icon: '09d' },
    313: { group: 'Drizzle', main: 'Drizzle', desc: 'shower rain and drizzle', icon: '09d' },
    314: { group: 'Drizzle', main: 'Drizzle', desc: 'heavy shower rain and drizzle', icon: '09d' },
    321: { group: 'Drizzle', main: 'Drizzle', desc: 'shower drizzle', icon: '09d' },

    // Group 5xx: Rain
    500: { group: 'Rain', main: 'Rain', desc: 'light rain', icon: '10d' },
    501: { group: 'Rain', main: 'Rain', desc: 'moderate rain', icon: '10d' },
    502: { group: 'Rain', main: 'Rain', desc: 'heavy intensity rain', icon: '10d' },
    503: { group: 'Rain', main: 'Rain', desc: 'very heavy rain', icon: '10d' },
    504: { group: 'Rain', main: 'Rain', desc: 'extreme rain', icon: '10d' },
    511: { group: 'Rain', main: 'Rain', desc: 'freezing rain', icon: '13d' },
    520: { group: 'Rain', main: 'Rain', desc: 'light intensity shower rain', icon: '09d' },
    521: { group: 'Rain', main: 'Rain', desc: 'shower rain', icon: '09d' },
    522: { group: 'Rain', main: 'Rain', desc: 'heavy intensity shower rain', icon: '09d' },
    531: { group: 'Rain', main: 'Rain', desc: 'ragged shower rain', icon: '09d' },

    // Group 6xx: Snow
    600: { group: 'Snow', main: 'Snow', desc: 'light snow', icon: '13d' },
    601: { group: 'Snow', main: 'Snow', desc: 'snow', icon: '13d' },
    602: { group: 'Snow', main: 'Snow', desc: 'heavy snow', icon: '13d' },
    611: { group: 'Snow', main: 'Snow', desc: 'sleet', icon: '13d' },
    612: { group: 'Snow', main: 'Snow', desc: 'light shower sleet', icon: '13d' },
    613: { group: 'Snow', main: 'Snow', desc: 'shower sleet', icon: '13d' },
    615: { group: 'Snow', main: 'Snow', desc: 'light rain and snow', icon: '13d' },
    616: { group: 'Snow', main: 'Snow', desc: 'rain and snow', icon: '13d' },
    620: { group: 'Snow', main: 'Snow', desc: 'light shower snow', icon: '13d' },
    621: { group: 'Snow', main: 'Snow', desc: 'shower snow', icon: '13d' },
    622: { group: 'Snow', main: 'Snow', desc: 'heavy shower snow', icon: '13d' },

    // Group 7xx: Atmosphere
    701: { group: 'Atmosphere', main: 'Mist', desc: 'mist', icon: '50d' },
    711: { group: 'Atmosphere', main: 'Smoke', desc: 'smoke', icon: '50d' },
    721: { group: 'Atmosphere', main: 'Haze', desc: 'haze', icon: '50d' },
    731: { group: 'Atmosphere', main: 'Dust', desc: 'sand/dust whirls', icon: '50d' },
    741: { group: 'Atmosphere', main: 'Fog', desc: 'fog', icon: '50d' },
    751: { group: 'Atmosphere', main: 'Sand', desc: 'sand', icon: '50d' },
    761: { group: 'Atmosphere', main: 'Dust', desc: 'dust', icon: '50d' },
    762: { group: 'Atmosphere', main: 'Ash', desc: 'volcanic ash', icon: '50d' },
    771: { group: 'Atmosphere', main: 'Squall', desc: 'squalls', icon: '50d' },
    781: { group: 'Atmosphere', main: 'Tornado', desc: 'tornado', icon: '50d' },

    // Group 800: Clear
    800: { group: 'Clear', main: 'Clear', desc: 'clear sky', icon: '01d' },

    // Group 80x: Clouds
    801: { group: 'Clouds', main: 'Clouds', desc: 'few clouds: 11-25%', icon: '02d' },
    802: { group: 'Clouds', main: 'Clouds', desc: 'scattered clouds: 25-50%', icon: '03d' },
    803: { group: 'Clouds', main: 'Clouds', desc: 'broken clouds: 51-84%', icon: '04d' },
    804: { group: 'Clouds', main: 'Clouds', desc: 'overcast clouds: 85-100%', icon: '04d' }
}
