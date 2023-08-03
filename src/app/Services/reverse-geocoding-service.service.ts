import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodingServiceService {
  private readonly apiKey: string = 'f79b33fe2c3e4c54ad0a42afdf2a7ae8';
  private readonly apiUrl: string = 'https://api.opencagedata.com/geocode/v1/json';

  AdressFormatted!:any;
 

  constructor(private http: HttpClient) {}
  async getCoordinates(address: string): Promise<Coordinates> {
    
    try {
      const response = await this.http
        .get<any>(`${this.apiUrl}?q=${encodeURIComponent(address)}&key=${this.apiKey}`)
        .toPromise();

      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      throw error;
    }
  }
  getAddress(lat:number, lng:number) {
    const apiKey1 = 'f79b33fe2c3e4c54ad0a42afdf2a7ae8';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey1}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          return data.results[0].formatted.toString();
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        return null;
      });
  }





 degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

 haversineDistance(from: Coordinates, to: Coordinates, unit: 'km' | 'mi'): number {
  const earthRadius = unit === 'km' ? 6371 : 3959; 
  const { latitude: lat1, longitude: lon1 } = from;
  const { latitude: lat2, longitude: lon2 } = to;

  const dLat = this.degreesToRadians(lat2 - lat1);
  const dLon = this.degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.degreesToRadians(lat1)) *
      Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

 
}
interface Coordinates {
  latitude: number;
  longitude: number;
}



