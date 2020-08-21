import { RecipeMedicine } from './recipe-medicine.interface';

export interface Recipe {
    active    : boolean,
    medicines : RecipeMedicine[],
    recipeText: string,
    uidDoctor : string,
    uidPatient: string
}