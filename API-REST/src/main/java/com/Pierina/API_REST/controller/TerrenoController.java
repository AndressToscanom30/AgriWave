package com.Pierina.API_REST.controller;

import com.Pierina.API_REST.repo.TerrenoRepository;
import java.util.List;
import com.Pierina.API_REST.model.Terreno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/terrenos")
public class TerrenoController {

    @Autowired
    private TerrenoRepository terrenoRepository;

    @GetMapping("")
    List<Terreno> index(){

        return terrenoRepository.findAll();

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Terreno create(@RequestBody Terreno terreno){
        return terrenoRepository.save(terreno);
    }

    @PutMapping("{id}")
    Terreno update(@PathVariable String id, @RequestBody Terreno terreno){

        Terreno terrenoFromDB = terrenoRepository
                .findById(id)
                .orElseThrow (RuntimeException::new);
     
        terrenoFromDB.setTipo(terreno.getTipo());
        terrenoFromDB.setHectareas(terreno.getHectareas());
        terrenoFromDB.setTopografia(terreno.getTopografia());
        terrenoFromDB.setCondicionesAmb(terreno.getCondicionesAmb());
        terrenoFromDB.setUbicacion(terreno.getUbicacion());
        terrenoFromDB.setZonificacion(terreno.getZonificacion());
        terrenoFromDB.setCostoTerreno(terreno.getCostoTerreno());
        terrenoFromDB.setCostoMantenimiento(terreno.getCostoMantenimiento());
        terrenoFromDB.setCostoConstrucciones(terreno.getCostoConstrucciones());
        terrenoFromDB.setCostoArriendo(terreno.getCostoArriendo());
        terrenoFromDB.setAdicionales(terreno.getAdicionales());

        return terrenoRepository.save(terrenoFromDB);
        
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){

        Terreno terreno = terrenoRepository
                .findById(id)
                .orElseThrow (RuntimeException::new);

        terrenoRepository.delete(terreno);
    
    }

}