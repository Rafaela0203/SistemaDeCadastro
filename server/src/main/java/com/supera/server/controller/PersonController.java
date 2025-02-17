package com.supera.server.controller;

import com.supera.server.dto.PersonDTO;
import com.supera.server.model.Person;
import com.supera.server.service.IPersonService;
import com.supera.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RestController
@Configuration
@EnableWebMvc
@RequestMapping("clientes")
public class PersonController extends CrudController<Person, PersonDTO, Long>  implements WebMvcConfigurer{
    private static IPersonService personService;
    private static ModelMapper modelMapper;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }

    public PersonController(IPersonService personService, ModelMapper modelMapper) {
        super(Person.class, PersonDTO.class);
        PersonController.personService = personService;
        PersonController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Person, Long> getService() {
        return PersonController.personService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> update (@PathVariable Long id, @RequestBody Person person) {
        if (!personService.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        person.setId(id); // Ensure the ID is set for the update
        Person updatedPerson  = personService.save(person);
        return ResponseEntity.ok(updatedPerson );
    }

    protected ModelMapper getModelMapper() {
        return PersonController.modelMapper;
    }
}
