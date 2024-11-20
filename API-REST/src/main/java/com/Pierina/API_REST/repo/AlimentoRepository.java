package com.Pierina.API_REST.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Pierina.API_REST.model.Alimento;

public interface AlimentoRepository extends MongoRepository<Alimento, String> {

}