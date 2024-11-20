package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.Animal;

public interface AnimalRepository extends MongoRepository<Animal, String>{

}