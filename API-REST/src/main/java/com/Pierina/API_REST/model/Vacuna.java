package com.Pierina.API_REST.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Vacuna {

    @Id
    private String id;
    private String nombre;
    private LocalDate fechaVacunacion;
    private float precio;
    private LocalDate proximaVacunacion;

}