package com.Pierina.API_REST.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Animal {

    @Id
    private String id;
    private String nombre;
    private String raza;
    private LocalDate fechaNacimiento;
    private float peso;
    private String origen;
    private float costoAnimal;
    private LocalDate fechaCompra;
    private boolean documentado;
    private float adicional;

}