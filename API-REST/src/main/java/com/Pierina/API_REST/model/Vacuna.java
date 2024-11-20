package com.Pierina.API_REST.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Vacuna {

    @Id
    private String nombre;
    private Date fechaVacunacion;
    private float precio;
    private Date proximaVacunacion;

}