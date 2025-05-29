import Formats from './formats.js'

class Functions{
    
    static testWorker = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';
    static testLocation = '7a021f75-cfa7-4e0f-9a6a-98ab5a58bb71';

    static GetTestID(entity){
        switch(entity){
            case 'workers':
                return this.testWorker;
                break;
            case 'locations':
                return this.testLocation;
                break;
            default:
                return 'default'
                break;
        }
    }
    
    static GetExpectedEntityValues(entity){
        switch(entity){
            case 'workers':
                return Formats.expectedWorkerValues;
            case 'locations':
                return Formats.expectedLocationValues;
            default:
                expect(0).equal(1);
        }
    }
    
    static GetExpectedEntityFields(entity){
        switch(entity){
            case 'workers':
                return Formats.expectedWorkerFields;
            case 'locations':
                return Formats.expectedLocationFields;
            default:
                expect(0).equal(1);
        }
    }
}

export default Functions;