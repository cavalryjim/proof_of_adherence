import { Health } from '@ionic-native/health';
import { Injectable } from "@angular/core";
//import { Observable } from 'rxjs/Observable';


@Injectable()
export class HealthService {
  //today: Date = new Date();
  //yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  
  constructor( private health: Health ) {
    this.requestAuthorization();
  }
  
  isAvailable() {
    return this.health.isAvailable().then((available:boolean) => {
      console.log("Health available: " + available);
      return available;
    }).catch(e => {
      console.log(e);
      return false;
    });
  } 
  
  getDistance(sDate: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              eDate: Date = new Date(),
              bucketType: string = 'day') {
    //this.requestAuthorization(); 
    return this.health.queryAggregated({
      startDate: sDate, // one day ago
      endDate:  eDate, // now
      dataType: 'distance',
      bucket: bucketType })
    .then(results => {
      console.log('Distance ' + results[0].value);
      //return +(+results[0].value / 1609.344).toFixed(1);
      return results;
    })
    .catch(e => {
      console.log(e);
      return 0;
    })
    
  }
  
  getSteps(sDate: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
           eDate: Date = new Date(),
           bucketType: string = 'day' ) { 
    //this.requestAuthorization();
    return this.health.queryAggregated({
      startDate: sDate, 
      endDate: eDate, 
      dataType: 'steps',
      bucket: bucketType })
    .then(results => {
      //console.log('HealthService success');
      //console.log('HealthService results ' + results);
      return results;
      //return +(+results[0].value).toFixed(0);
    })
    .catch(e => {
      console.log(e);
      return 0;
    })
  }
  
  getCalories(sDate: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              eDate: Date = new Date(),
              bucketType: string = 'day') {
    //this.requestAuthorization();
    return this.health.queryAggregated({
      startDate: sDate, // one day ago
      endDate: eDate, // now
      dataType: 'calories',
      bucket: bucketType })
    .then(results => {
      console.log(results);
      console.log('Calories ' + results[0].value);
      return +results[0].value;
    })
    .catch(e => {
      console.log(e);
      return 0;
    })
  }
    
  requestAuthorization() {
    //return true;
    return this.health.requestAuthorization([
      'steps', 'distance', 'nutrition', 'calories', 'activity', 'height', 'weight', 'heart_rate',
      'fat_percentage', 'gender', 'date_of_birth', 'nutrition'  //read and write permissions
    ])
    .then(
      res => {
        console.log('Health authorization: ' + res);
        return true;
      }
    )
    .catch(e => {
      console.log(e);
      return false;
    });
  }
  
}