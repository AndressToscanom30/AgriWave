package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.Terreno;

public interface TerrenoRepository extends MongoRepository<Terreno, String> {
    
}