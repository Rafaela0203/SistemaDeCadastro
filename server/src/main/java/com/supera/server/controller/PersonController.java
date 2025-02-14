package com.supera.server.controller;

import com.supera.server.dto.PersonDTO;
import com.supera.server.model.Person;
import com.supera.server.service.IPersonService;
import com.supera.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("clientes")
public class PersonController extends CrudController<Person, PersonDTO, Long>{
    private static IPersonService personService;
    private static ModelMapper modelMapper;

    public PersonController(IPersonService personService, ModelMapper modelMapper) {
        super(Person.class, PersonDTO.class);
        PersonController.personService = personService;
        PersonController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Person, Long> getService() {
        return PersonController.personService;
    }

    protected ModelMapper getModelMapper() {
        return PersonController.modelMapper;
    }
}
