package Repo;

import model.Tarea;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TareaRepository extends MongoRepository<Tarea, String> {

    
    
}
