package com.Pierina.API_REST.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.Pierina.API_REST.model.Animal;
import com.Pierina.API_REST.repo.AnimalRepository;

@CrossOrigin
@RestController
@RequestMapping("/animales")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping("")
    public List<Animal> index() {
        List<Animal> animales = animalRepository.findAll();
        animales.forEach(animal -> {
            Object fechaNacimiento = animal.getFechaNacimiento();
            if (fechaNacimiento instanceof Date) {
                Date utilDate = (Date) fechaNacimiento;
                LocalDate localDate = utilDate.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
                animal.setFechaNacimiento(localDate);
            }
        });
        return animales;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public Animal create(@RequestBody Animal animal) {
        return animalRepository.save(animal);
    }

    @PutMapping("{id}")
    public Animal update(@PathVariable String id, @RequestBody Animal animal) {
        Animal animalFromDB = animalRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        animalFromDB.setNombre(animal.getNombre());
        animalFromDB.setRaza(animal.getRaza());
        animalFromDB.setFechaNacimiento(animal.getFechaNacimiento());
        animalFromDB.setPeso(animal.getPeso());
        animalFromDB.setOrigen(animal.getOrigen());
        animalFromDB.setCostoAnimal(animal.getCostoAnimal());
        animalFromDB.setFechaCompra(animal.getFechaCompra());
        animalFromDB.setDocumentado(animal.isDocumentado());
        animalFromDB.setAdicional(animal.getAdicional());

        return animalRepository.save(animalFromDB);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Animal animal = animalRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        animalRepository.delete(animal);
    }
}
