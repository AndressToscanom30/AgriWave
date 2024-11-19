package controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mi-ruta")
public class myController {

    @GetMapping
    public String obtener() {
        return "Hola desde GET";
    }

    @PostMapping
    public String crear() {
        return "Hola desde POST";
    }
    
}