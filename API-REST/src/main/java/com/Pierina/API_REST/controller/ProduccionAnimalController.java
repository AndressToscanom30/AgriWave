package com.Pierina.API_REST.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.Pierina.API_REST.model.ProduccionAnimal;
import com.Pierina.API_REST.repo.ProduccionAnimalRepository;

@CrossOrigin
@RestController
@RequestMapping("/produccion-animal")
public class ProduccionAnimalController {

    @Autowired
    private ProduccionAnimalRepository produccionAnimalRepository;

    @GetMapping("")
    List<ProduccionAnimal> index(){
        
        return produccionAnimalRepository.findAll();

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    ProduccionAnimal produccionAnimal(@RequestBody ProduccionAnimal produccionAnimal){

        return produccionAnimalRepository.save(produccionAnimal);
    }

    @PutMapping("{id}")
    ProduccionAnimal update(@PathVariable String id, @RequestBody ProduccionAnimal produccionAnimal){

        ProduccionAnimal produccionAnimalFromDB = produccionAnimalRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        produccionAnimalFromDB.setTipoAnimal(produccionAnimal.getTipoAnimal());
        produccionAnimalFromDB.setTipoProduccion(produccionAnimal.getTipoProduccion());
        produccionAnimalFromDB.setCantidadDiariaProduccion(produccionAnimal.getCantidadDiariaProduccion());
        produccionAnimalFromDB.setCostoProducto(produccionAnimal.getCostoProducto());
        produccionAnimalFromDB.setTipoProduccionSec(produccionAnimal.getTipoProduccionSec());

        return produccionAnimalRepository.save(produccionAnimalFromDB);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){

        ProduccionAnimal produccionAnimal = produccionAnimalRepository
                .findById(id)
                .orElseThrow (RuntimeException::new);

        produccionAnimalRepository.delete(produccionAnimal);
    
    }

}