package com.Pierina.API_REST.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.Pierina.API_REST.repo.AlimentoRepository;
import com.Pierina.API_REST.model.Alimento;
import org.springframework.http.HttpStatus;

@CrossOrigin
@RestController
@RequestMapping("alimentos")
public class AlimentoController {

    @Autowired
    private AlimentoRepository alimentoRepository;

    @GetMapping("")
    List<Alimento> index(){

        return alimentoRepository.findAll();
    
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Alimento create(@RequestBody Alimento alimento){

        return alimentoRepository.save(alimento);

    }

    @PutMapping("{id}")
    Alimento update(@PathVariable String id, @RequestBody Alimento alimento){

        Alimento alimentoFromDB = alimentoRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        alimentoFromDB.setTipoAlimento(alimento.getTipoAlimento());
        alimentoFromDB.setMarca(alimento.getMarca());
        alimentoFromDB.setPrecio(alimento.getPrecio());
        alimentoFromDB.setCantidad(alimento.getCantidad());

        return alimentoRepository.save(alimentoFromDB);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){

        Alimento alimento = alimentoRepository
            .findById(id)
            .orElseThrow(RuntimeException::new);

        alimentoRepository.delete(alimento);

    }

}
