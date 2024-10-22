package controller;

import Repo.TareaRepository;
import java.util.List;
import model.Tarea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tareas")
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    @GetMapping("")
    List<Tarea> index(){
    
        return tareaRepository.findAll();
        
    }
    
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Tarea create(@RequestBody Tarea tarea){
        
        return tareaRepository.save(tarea);
        
    }
    
    @PutMapping("{id}")
    Tarea update(@PathVariable String id, @RequestBody Tarea tarea){
        
        Tarea tareaFromDB = tareaRepository
                .findById(id)
                .orElseThrow (RuntimeException::new);
        
        tareaFromDB.setNombre(tarea.getNombre());
        tareaFromDB.setCompleatado(tarea.isCompleatado());
        
        
        return tareaRepository.save(tareaFromDB);
        
    }
    
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        
        Tarea tarea = tareaRepository
                .findById(id)
                .orElseThrow (RuntimeException::new);
     
        tareaRepository.delete(tarea);
        
    }
    
}
