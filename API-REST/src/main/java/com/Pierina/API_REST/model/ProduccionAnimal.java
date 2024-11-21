package com.Pierina.API_REST.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class ProduccionAnimal {

    @Id
    private String id;
    private String tipoAnimal;
    private String tipoProduccion;
    private float cantidadDiariaProduccion;
    private float costoProducto;
    private String tipoProduccionSec;

}