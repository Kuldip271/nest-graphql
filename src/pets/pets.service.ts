import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {

    constructor(@InjectRepository(Pet) private petsRepository : Repository<Pet>, private ownersService: OwnerService){}

    createPet(createPetInput : CreatePetInput) : Promise<Pet>{
        const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet(); new.name = input.name;
       
        return this.petsRepository.save(newPet);  // insert
    }

   async findAll(): Promise<Pet[]>{
        // const pet = new Pet();
        // pet.id = 1;
        // pet.name = "Mambo";

        // return [pet];

        return this.petsRepository.find();  // select * pet
    }

    findOne(id:number): Promise<Pet>{
        return this.petsRepository.findOneOrFail({
            where:{
                id:id
            }
        });
    }

    getOwner(ownerId : number): Promise<Owner>{
        return this.ownersService.findOne(ownerId)
    }
}
