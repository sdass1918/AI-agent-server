import axios from 'axios';

export async function getWeather(location: string): Promise<string> {
    const apiKey = process.env.WEATHER_API_KEY; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return `The current temperature in ${data.location.name} is ${data.current.temp_c}°C with ${data.current.condition.text}.`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return 'Sorry, I could not retrieve the weather information at this time.';
    }
}