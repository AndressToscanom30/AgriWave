package com.Pierina.API_REST.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.Pierina.API_REST.model.Animal;
import com.Pierina.API_REST.repo.AnimalRepository;

@CrossOrigin
@RestController
@RequestMapping("/animales")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping("")
    List<Animal> index(){

        return animalRepository.findAll();

    }

}

@ResponseStatus(HttpStatus.CREATED)
@PostMapping("")
Animal create(@RequestBody Animal animal){
    return animalRepository.save(animal);
}