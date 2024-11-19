package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.Tarea;

public interface TareaRepository extends MongoRepository<Tarea, String> {

    

}
