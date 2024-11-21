package com.Pierina.API_REST.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.Pierina.API_REST.model.Vacuna;
import com.Pierina.API_REST.repo.VacunaRepository;

@CrossOrigin
@RestController
@RequestMapping("/vacunas")
public class VacunaController {

    @Autowired
    private VacunaRepository vacunaRepository;

    @GetMapping("")
    public List<Vacuna> index() {
        List<Vacuna> vacunas = vacunaRepository.findAll();
        
        vacunas.forEach(vacuna -> {
            Object fechaVacunacion = vacuna.getFechaVacunacion();
            if (fechaVacunacion instanceof Date) {
                Date utilDate = (Date) fechaVacunacion;
                LocalDate localDate = utilDate.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
                vacuna.setFechaVacunacion(localDate);
            }
        });
        
        return vacunas;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Vacuna create(@RequestBody Vacuna vacuna){

        return vacunaRepository.save(vacuna);

    }

    @PutMapping("{id}")
    Vacuna update(@PathVariable String id, @RequestBody Vacuna vacuna){

        Vacuna vacunaFromDB = vacunaRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        vacunaFromDB.setNombre(vacuna.getNombre());
        vacunaFromDB.setFechaVacunacion(vacuna.getFechaVacunacion());
        vacunaFromDB.setPrecio(vacuna.getPrecio());
        vacunaFromDB.setProximaVacunacion(vacuna.getProximaVacunacion());

        return vacunaRepository.save(vacunaFromDB);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        
        Vacuna vacuna = vacunaRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        vacunaRepository.delete(vacuna);
        
    }

}