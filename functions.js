import Formats from './formats.js'

class Functions{
    
    static testWorker = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';
    static testLocation = '7a021f75-cfa7-4e0f-9a6a-98ab5a58bb71';

    static GetTestID(entity){
        switch(entity){
            case 'workers':
                return this.testWorker;
            case 'locations':
                return this.testLocation;
            default:
                console.error('GetTestID defaulted. Check your entity.')
        }
    }
    
    static GetExpectedEntityValues(entity){
        switch(entity){
            case 'workers':
                return Formats.expectedWorkerValues;
            case 'locations':
                return Formats.expectedLocationValues;
            default:
                console.error('GetExpectedEntityValues defaulted. Check your entity.')
        }
    }
    
    static GetExpectedEntityFields(entity){
        switch(entity){
            case 'workers':
                return Formats.expectedWorkerFields;
            case 'locations':
                return Formats.expectedLocationFields;
            default:
                console.error('GetExpectedEntityFields defaulted. Check your entity.')

        }
    }

    static GetExpectedPatchableEntityValues(entity){
        switch(entity){
            case 'workers':
                return Formats.patchableExpectedWorkerValues;
                break;
            case 'locations':
                //fillin
                break;
            default:
                console.error('GetExpectedPathableEntityFields defaulted. Check your entity.')
        }
    }

    static BothEntitiesMatchInOrder(entity1, entity2){
        entity1Keys = Object.keys(entity1)
        entity2Keys = Object.keys(entity2)
        for(let i = 0; i < entity1.length; i++){
            if (entity1Keys[i]!=entity2Keys[i])
                return false;
        }
        return true;
    }

    static ConvertGetObjectToPatchObject(entity, object){
        let patchStructure = this.GetExpectedPatchableEntityValues(entity)
        for (var key in Object.keys(patchStructure)){
            if(object[key]!=null)
                patchStructure[key]=object[key];
            else
                delete(patchStructure.key);
        }
        return patchStructure;
    }

}

export default Functions;