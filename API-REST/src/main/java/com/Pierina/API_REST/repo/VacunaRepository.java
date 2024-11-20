package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.Vacuna;

public interface VacunaRepository extends MongoRepository<Vacuna, String>{

}