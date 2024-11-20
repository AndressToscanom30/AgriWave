package com.Pierina.API_REST.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Terreno {

    @Id
    private String id;
    private String tipo;
    private float hectareas;
    private String topografia;
    private String condicionesAmb;
    private String ubicacion;
    private String zonificacion;
    

}
