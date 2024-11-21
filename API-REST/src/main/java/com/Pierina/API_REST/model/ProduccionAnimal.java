package com.Pierina.API_REST.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class ProduccionAnimal {

    private String tipoAnimal;
    private String tipoProduccion;
    private float cantidadDiariaProduccion;
    private float costoProducto;
    private String tipoProduccionSec;

}