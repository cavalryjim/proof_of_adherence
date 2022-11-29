export class Reading {
  constructor(public value1: number,
              public value2: number,
              public value3: number,
              public value4: number,
              public value_str: string,
              public date: Date,
              public type: string, 
              public synched: boolean ) {
  }
  
  test() {
    return "test return";
  }
  
  label() {
    switch (this.type) {
      case ('thermometer'):
        return'deg';
      case ('blood_pressure'):
        return 'mmHg';
      case ('heart_rate'):
        return 'bpm';
      case ('glucose'):
        return'mg/dl';
      case ('weight'):
        return 'lbs';
      case ('pulse_oximeter'):
        return '%';
      case ('fitness_tracker'):
        return 'level';
    }
  }
}