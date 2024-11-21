package com.Pierina.API_REST.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class Alimento {

    @Id
    private String id;
    private String tipoAlimento;
    private String Marca;
    private float precio;
    private float cantidad;

}