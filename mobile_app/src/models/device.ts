export class DeviceModel {
  constructor(public id: number,
              public name: string,
              public manufacturer: string,
              public model: string,
              public serial_number: string,
              public mac_address: string,
              public validic_id: number,
              public image_url: string,
              public peripheral_type: string,
              public paired: boolean,
              public last_reading: Date,
              public active: boolean) {
  }
  
  readingLabel() {
    switch (this.peripheral_type) {
      case ('thermometer'):
        return'&#8457';
        //break;
      case ('blood_pressure'):
        return 'mm Hg';
        //break;
      case ('heart_rate'):
        return 'bpm';
        //break;
      case ('glucose'):
        return'level';
        //break;
      case ('weight'):
        return 'lbs';
        //break;
      case ('pulse_oximeter'):
        return '%';
        //break;
      case ('fitness_tracker'):
        return 'level';
        //break;
    }
  }
}

// JDavis: todo - add device_id from HE app.

/*  JDavis: peripheral_types
    none: 0,
    thermometer: 1,
    blood_pressure: 2,
    heart_rate: 3,
    glucose: 4,
    weight: 5,
    pulse_oximeter: 6
    fitness_tracker:
*/
