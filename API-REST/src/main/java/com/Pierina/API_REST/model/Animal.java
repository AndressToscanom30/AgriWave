package com.Pierina.API_REST.model;

import java.sql.Date;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Animal {

    private String nombre;
    private String raza;
    private Date fechaNacimiento;
    private float peso;
    private String origen;

}