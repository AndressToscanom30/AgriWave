package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.ProduccionAnimal;

public interface ProduccionAnimalRepository extends MongoRepository<ProduccionAnimal, String>{

}